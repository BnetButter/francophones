import * as ReactDOM from "react-dom"
import App from "./components/app"
import "./index.css"


const API_KEY = "a296fc4c8a77cd6cbddb87e24787c809"

ReactDOM.render(<App apiKey={API_KEY} />, document.getElementById("root"));
