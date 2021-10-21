import * as React from "react"
import "./app.css"
import Weather from "./weather/weather"


export default
function App(props: any)
{
    return <Weather {...props} zipCode={65401} /> 
}
