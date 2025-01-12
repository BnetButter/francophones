import clear_day from "./icons/clear_day.png"
import clear_night from "./icons/clear_night.png"
import cloudy_day from "./icons/cloudy_day.png"
import cloudy_night from "./icons/cloudy_night.png"
import scattered_clouds from "./icons/scattered_clouds.png"
import broken_clouds from "./icons/broken_clouds.png"
import shower_rain from "./icons/shower_rain.png"
import rain_day from "./icons/rain_day.png"
import rain_night from "./icons/rain_night.png"
import thunderstorm from "./icons/thunderstorm.png"
import snow from "./icons/snow.png"
import mist from "./icons/mist.png"

const SKYBOX_IMAGES: any = {
    /* DAY */
    "01d": clear_day,
    "02d": cloudy_day,
    "03d": scattered_clouds,
    "04d": broken_clouds,
    "09d": shower_rain,
    "10d": rain_day,
    "11d": thunderstorm,
    "13d": snow,
    "50d": mist,
    /* NIGHT */
    "01n": clear_night,
    "02n": cloudy_night,
    "03n": scattered_clouds,
    "04n": broken_clouds,
    "09n": shower_rain,
    "10n": rain_night,
    "11n": thunderstorm,
    "13n": snow,
    "50n": mist,
}

export default
class WeatherData {
    /* Defines getters for properties that we care about. */
    _data: any;
    _isvalid: Number;

    constructor(data: any) { this._data = data; this._isvalid = Object.keys(this._data).length}
 
    get icon(): string {
        return this._isvalid ? SKYBOX_IMAGES[this._data.weather[0].icon] : ""
    }

    /* Temperature is in Kelvin so -1 is error code */
    get temp(): number { return this._isvalid ? this._data.main.temp : -1 }
    get temp_min(): number { return this._isvalid ? this._data.main.temp_min: -1 }
    get temp_max(): number { return this._isvalid ? this._data.main.temp_max: -1 }
    
    /* Datetime is unsigned so -1 on error code */
    get dt(): number { return this._isvalid ? this._data.dt : -1 }

}
