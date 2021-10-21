import * as ReactDOM from "react-dom"
import App from "./components/app"
import "./index.css"


const API_KEY = "88931b2fc3174599c64022e2f660fb4f"

ReactDOM.render(<App apiKey={API_KEY} />, document.getElementById("root"));
