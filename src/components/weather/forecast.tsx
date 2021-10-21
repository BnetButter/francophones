import * as React from "react"
import WeatherData from "./WeatherData"

interface ForecastProps {
    data: Array<WeatherData>
};

export default 
function Forecast(props: ForecastProps)
{
    let data = props.data;

    return (
        <div id="Forecast">

        </div>
    )
}
