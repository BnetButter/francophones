import * as React from "react"
import * as ReactDOM from "react-dom"
import "./app.css"
import Weather from "./weather/weather"
import {TempScale} from "./weather/TempScale"
import {WeatherInterface} from "./weather/weather"

interface AppI {
    apiKey: string
};

export default
class App extends React.Component<AppI, WeatherInterface>
{

    constructor(props: AppI)
    {
        super(props)
        this.state = {
            apiKey: props.apiKey,
            zipCode: 65401,
            scale: TempScale.Fahrenheit
        }
    }

    render()
    {
        let props = this.props;
        let onclick = (scale: TempScale) =>
        {
            let zipCode = parseInt((document.getElementById("ZipCode") as any).value)
            this.setState({zipCode, scale})
        }
    
        return (
            <div>
                <label>Zip Code </label>
                <input id="ZipCode" type="text"/>
                <button onClick={() => onclick(TempScale.Fahrenheit)}>Fahrenheit</button>
                <button onClick={() => onclick(TempScale.Celsius)}>Celsius</button>
                <button onClick={() => onclick(TempScale.Kelvin)}>Kelvin</button>
    
                <div id="WeatherWrapper">
                    <Weather {...props} zipCode={this.state.zipCode} scale={this.state.scale}/>
                </div>
            </div>
        )
    }    
}
