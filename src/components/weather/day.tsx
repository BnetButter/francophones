import * as React from "react"
import Temperature from "./temp"
import WeatherData from "./WeatherData"


interface DayProps {
    data: WeatherData
};

export default 
function Day(props: DayProps) {
    const data = props.data;
    
    function format(temp: Number, scale_string: string = ""): string
    {
        return `${temp}\u00b0${scale_string}`
    }

    return (
        <div id="Day">
            <img src={data.icon}/>
            <div id="Temperature"></div>
            <div>
                <div>
                    <div className="label">Low</div>
                    <div className="subtemp">{format(data.temp_min)}</div>
                </div>
                <div>
                    <div className="label">High</div>
                    <div className="subtemp">{format(data.temp_max)}</div>
                </div>
            </div>
        </div>
    )
}

