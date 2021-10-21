import assert from "assert"
import { IncomingMessage } from "http"
import { request } from "https"
import * as React from "react"

interface WeatherInterface {
    apiKey: string;
    zipCode: Number;
};

interface WeatherData {

};

interface WeatherForecast {
    
};

interface WeatherState {
    weather: WeatherData;
    forecast: WeatherForecast;
};

export default
class Weather extends React.Component < WeatherInterface, WeatherState > {

    constructor(props:WeatherInterface)
    {
        super(props)
        this.state = {
            weather: {},
            forecast: {},
        }

        assert(props.zipCode && props.apiKey)        
        const WEATHER = `https://api.openweathermap.org/data/2.5/weather?zip=${props?.zipCode}&appid=${props?.apiKey}`
        const FORECAST = `https://api.openweathermap.org/data/2.5/forecast?zip=${props?.zipCode}&appid=${props?.apiKey}`
        


        let getData = () => 
        {      
            const weather_req = request(WEATHER, (res:IncomingMessage) => {

                res.on("data", (data) => 
                {
                    console.debug(`${data}`)
                    this.setState(
                        {...this.state, weather: JSON.parse(data).weather}
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
                    console.debug(`${data}`)
                    this.setState({
                        ...this.state, 
                        weather: JSON.parse(data).list // multiday forecast
                    })
                })
            })

            forecast_req.on("error", (err) => console.warn(
                "Failed to fetch forecast")
            )
            forecast_req.end()
        }

        // Init loop
        setInterval(getData, 5000)
    }

    render()
    {
        return (<div>

        </div>)
    }
}