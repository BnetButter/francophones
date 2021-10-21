import strftime from "strftime"

export default
class DateTime {

    weekDay: string;
    day: string;
    month: string;

    constructor(dt:number)
    {
        const date = new Date(dt);
        this.weekDay = strftime("%a", date);
        this.day = strftime("%-d", date);
        this.month = strftime("%b", date);
    }
};
