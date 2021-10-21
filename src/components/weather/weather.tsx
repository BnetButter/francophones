import assert from "assert"
import { IncomingMessage } from "http"
import { request } from "https"
import * as React from "react"
import Day from "./day"
import Forecast from "./forecast"
import WeatherData from "./WeatherData"

interface WeatherInterface {
    apiKey: string;
    zipCode: Number;
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
                    forecast: forecast.map((value) => new WeatherData(value))
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
                <Day data={this.state.weather} />
                <Forecast data={this.state.forecast} />
            </div>
        )
    }
}
