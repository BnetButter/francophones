import * as React from "react"
import WeatherData from "./WeatherData"
import { TempScale } from "./TempScale"
import Temperature from "./temp";

import "./temp.css"

interface ForecastProps {
    data: Array<WeatherData>
    scale: TempScale
};

export default 
function Forecast(props: ForecastProps)
{
    let data = props.data;
    let children = data.map((data, key) => (
        
        <div key={key}>
            <div className="label">
                {(new Date(data._data.dt_txt)).toDateString()}
            </div>
            <img src={data.icon} />
            <Temperature data={data} scale={props.scale} />
        </div>
    ))

    let template = "";
    children.forEach(() => template += "1fr ");
        
    return (
        <div id="Forecast" style={{display: "inline-grid", gridTemplateColumns: template }}>
            {children}
        </div>
    )
}
