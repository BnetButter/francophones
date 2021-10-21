export default
class WeatherData {
    _data: any;

    constructor(data: any) { this._data = data; }

    get icon() { return this._data.weather[0].icon }
    get temp() { return this._data.main.temp }
    get temp_min() { return this._data.main.temp_min }
    get temp_max() { return this._data.main.temp_max }
    get dt() { return this._data.dt }

}
