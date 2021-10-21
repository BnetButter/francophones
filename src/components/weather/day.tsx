import * as React from "react"
import Temperature from "./temp"
import WeatherData from "./WeatherData"
import { TemperatureI } from "./temp"


export default 
function Day(props: TemperatureI) {
    const data = props.data;
    return (
        <div id="Day">
            <img src={data.icon}/>
            <Temperature {...props}/>
        </div>
    )
}

