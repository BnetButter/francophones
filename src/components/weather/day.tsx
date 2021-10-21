import * as React from "react"
import Temperature from "./temp"
import WeatherData from "./WeatherData"
import { TemperatureI } from "./temp"
import "./day.css"

export default 
function Day(props: TemperatureI) {
    const data = props.data;
    return (
        <div id="Day">
            <div>
                <img src={data.icon}/>
            </div>
            <div>
                <Temperature {...props}/>
            </div>
        </div>
    )
}

