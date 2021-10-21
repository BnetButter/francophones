import * as React from "react"
import WeatherData from "./WeatherData"
import * as tempscale from "./TempScale"

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
        <div id="Temperature">
            <div className="temp">
                {temp}
            </div>
            <div>
                <div>
                    <div className="label">Low</div>
                    <div className="subtemp">{low}</div>
                </div>
                <div>
                    <div className="label">High</div>
                    <div className="subtemp">{high}</div>
                </div>
            </div>
        </div>
    )
}