enum TempScale {
    Kelvin,
    Celsius,
    Fahrenheit,
};


const to_celsius = (temp: number): number => { return temp - 273 }
const to_farenheight = (temp: number): number => { return (temp - 273) * (9/5) + 32 }

function format(temp: number, scale: TempScale)
{
    switch (scale) {
        case TempScale.Kelvin:
            return `${temp}\u00b0 K`
        case TempScale.Celsius:
            return `${to_celsius(temp)}\u00b0 C`
        case TempScale.Fahrenheit:
            return `${to_farenheight(temp)}\u00b0 F`
        default:
            return ""
    }
}

export {
    TempScale,
    format,
};
