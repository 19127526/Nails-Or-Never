import {getHourOrMinutesString} from "@/utils/format-working-hour";

export const getFormatDate = ({day, month, year}) => {
    return `${getHourOrMinutesString(month)}-${getHourOrMinutesString(day)}-${year}`;
}

export const convertStringToTime = (value) => {
    let [h, m] = value.split(":");
    return {hour: Number(h), minute : Number(m)}
}

export const getTimeBooking = ({hour,minute}) => {
    return `${getHourOrMinutesString(hour)}:${getHourOrMinutesString(minute)}`
}



export const convertDateStrToNumber = (date) => {
    switch (date){
        case 'Mon':
            return 2;
        case 'Tue':
            return 3;
        case 'Wed':
            return 4;
        case 'Thu':
            return 5;
        case 'Fri':
            return 6;
        case 'Sat':
            return 7;
        case 'Sun':
            return 8;
        default:
            return 0;
    }
}

export const convertHourToMinutes = (timeInHour) => {
    let timeParts = timeInHour.split(":");
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
}

export const convertMinuteToHour = (mins) => {
    let h: string | number = Math.floor(mins / 60);
    let m: string | number = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
}