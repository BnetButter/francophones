import * as React from "react"
import WeatherData from "./WeatherData"


interface DayProps {
    data: WeatherData
};

export default 
function Day(props: DayProps) {
    const data = props.data;

    return (<div id="Day">
        <img src={data.icon}/>
    </div>)
}

