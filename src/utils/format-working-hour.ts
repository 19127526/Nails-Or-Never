import {DateInto} from "@/constants/label";

export const checkAMAndPM = (time : any) => {
    if(time[1] == 'AM') {
        return time;
    }
    else {
        let [h, m] = time[0].split(":");
        const timeTemp = `${Number(h)+12}:${m}`
        return [timeTemp, time[1]]
    }
}

export const convertWorkingHourToArray = (text : any) => {
    const arrTemp = text.toString().split(', ');
    const arrResult = []
    for(let i = 0; i< arrTemp.length; i++) {
        const data = arrTemp[i].toString().split(": ")
        const time = data[1].split(" - ")
        arrResult.push({
            date: data[0],
            time : {
                start: checkAMAndPM(time[0].split(" "))[0],
                end: checkAMAndPM(time[1].split(" "))[0],
            }
        })
    }
    return arrResult
}


export const convertWorkingHourToBookingArray = (text : any) => {
    const arrTemp = text?.toString().split(', ');
    const arrResult = []
    for(let i = 0; i< arrTemp?.length; i++) {
        const data = arrTemp[i].toString().split(": ")
        const time = data[1].split(" - ")
        arrResult.push({
            date: data[0],
            currentDate : DateInto[`${i}`] as any,
            time : {
                start: checkAMAndPM(time[0].split(" "))[0],
                end: checkAMAndPM(time[1].split(" "))[0],
            }
        })
    }
    return arrResult
}

export const getTimeAndUnit = (value : any) => {
    let [h, m] = value.split(":");
    const formatTime =  h >= 12 ? 'PM' : 'AM'
    const time = (h % 12 ? h % 12 : 12) + ":" + m;

    const timeTemp = time.split(":");
    if(timeTemp[0].toString().length == 1) {
        return `0${timeTemp[0]}:${timeTemp[1]} ${formatTime}`
    }
    else {
        return `${time} ${formatTime}`
    }
}


export const getHourOrMinutesString = (index : any) => {
    if(index.toString().length == 1 ) {
        return `0${index}`
    }
    return index
}


