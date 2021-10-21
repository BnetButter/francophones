import assert from "assert"
import { IncomingMessage } from "http"
import { request } from "https"
import * as React from "react"
import Day from "./day"
import Forecast from "./forecast"
import WeatherData from "./WeatherData"
import { TempScale } from "./TempScale"
import DateTime from "./DateTime"

interface WeatherInterface {
    apiKey: string;
    zipCode: Number;
    scale: TempScale;
};

interface WeatherState {
    weather: WeatherData;
    forecast: Array< WeatherData >;
};

export default
class Weather extends React.Component < WeatherInterface, WeatherState > {

    constructor(props:WeatherInterface)
    {
        super(props)
        this.state = {
            weather: new WeatherData({}),
            forecast: [],
        }

        assert(props.zipCode && props.apiKey)        
        const WEATHER = `https://api.openweathermap.org/data/2.5/weather?zip=${props?.zipCode}&appid=${props?.apiKey}`
        const FORECAST = `https://api.openweathermap.org/data/2.5/forecast?zip=${props?.zipCode}&appid=${props?.apiKey}`


        const weather_req = request(WEATHER, (res:IncomingMessage) => 
        {
            res.on("data", (data) => 
            {
                console.debug(`-- WEATHER --\n${JSON.stringify(JSON.parse(data), null, 2)}`)
                this.setState(
                    {...this.state, weather: new WeatherData(JSON.parse(data)) }
                )
            })
        })

        weather_req.on("error", (err) =>
        {
            console.warn("Failed to fetch weather")
        })
        
        weather_req.end()
        
        const forecast_req = request(FORECAST, (res: IncomingMessage) =>
        {
            res.on("data", (data) =>
            {
                const forecast: Array<any> = JSON.parse(data).list;

                console.debug(`-- FORECAST --\n${JSON.stringify(JSON.parse(data).list, null, 2)}`)
                this.setState({
                    ...this.state, 
                     // Cast forecast elements to WeatherData
                    forecast: get_forecast(forecast.map((value) => new WeatherData(value)))
                })

            })
        })

        forecast_req.on("error", (err) => console.warn(
            "Failed to fetch forecast")
        )
        forecast_req.end()
    }

    render()
    {
        return (
            <div className="Weather">
                <Day data={this.state.weather} scale={TempScale.Fahrenheit}/>
                <Forecast data={this.state.forecast} scale={TempScale.Fahrenheit}/>
            </div>
        )
    }
}


// Selects the Weather information that is closest to the current time but
// 24 hours later 
function get_forecast(forecast: Array <WeatherData>)
{
    let dt = Date.now()
    let tmp = [...forecast];
    let result = []
    
    let date_set = new Set()
    let datestring = (data: WeatherData) => (new Date(data._data.dt_txt)).toDateString()

    while (tmp.length) {
        // Select the object that's closest to (now + 86400 * k)
        let r = tmp.reduce((a, b) => (a.dt - dt) < (b.dt - dt) ? a : b)
        result.push(r)

        // Add to set so we can ingore it later
        date_set.add(datestring(r))

        // Filter out values selected date
        tmp = tmp.filter((x) => ! date_set.has(datestring(x)));
        
        // Next day...
        dt += 86400
    }

    return result
}