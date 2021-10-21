import * as React from "react"
import WeatherData from "./WeatherData"
import { TempScale } from "./TempScale"
import Temperature from "./temp";

import "./temp.css"
import "./forecast.css"

interface ForecastProps {
    data: Array<WeatherData>
    scale: TempScale
};

export default 
function Forecast(props: ForecastProps)
{
    let data = props.data;
    let children = data.map((x, key) => (
        
        <div key={key}>
            <div className="label">
                {(new Date(x._data.dt_txt)).toDateString()}
            </div>
            <div style={{textAlign:"center"}}>
                <img src={x.icon} style={{ width: `${100 / data.length}%`}}/>
            </div>
            <Temperature data={x} scale={props.scale} />
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
