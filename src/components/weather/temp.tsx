import * as React from "react"
import WeatherData from "./WeatherData"
import * as tempscale from "./TempScale"
import "./temp.css"

export interface TemperatureI {
    data: WeatherData;
    scale: tempscale.TempScale;
};

export default
function Temperature(props: TemperatureI)
{
    const data = props.data;
    const temp = tempscale.format(data.temp, props.scale)
    const low = tempscale.format(data.temp_min, props.scale)
    const high = tempscale.format(data.temp_max, props.scale)

    return (
        <div className="Temperature">
            <div className="temp">
                {temp}
            </div>
            <div>
                <div className="Subtemp">
                    <div className="label">Low</div>
                    <div>{low}</div>
                </div>
                <div className="Subtemp">
                    <div className="label">High</div>
                    <div>{high}</div>
                </div>
            </div>
        </div>
    )
}