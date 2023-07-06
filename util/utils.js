export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


export const onImageEdit = async (imgUrl) => {
  let imgExt = getUrlExtension(imgUrl);

  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const file = await new File([blob], "profileImage." + imgExt, {
    type: blob.type,
  });

  return file;
}

const getUrlExtension = (url) => {
  return url
    .split(/[#?]/)[0]
    .split(".")
    .pop()
    .trim();
}

export const getHourOrMinutesString = (index) => {
  if (index != undefined) {
    if (index.toString().length == 1) {
      return `0${index}`
    }
  }
  return index
}

export const getFormatDate = ({day, month, year}) => {
  return `${getHourOrMinutesString(month)}-${getHourOrMinutesString(day)}-${year}`;
}


export const checkAMAndPM = (time) => {
  if (time[1] == 'AM') {
    return time;
  } else {
    let [h, m] = time[0].split(":");
    const timeTemp = `${Number(h) + 12}:${m}`
    return [timeTemp, time[1]]
  }
}

export const convertWorkingHourToArray = (text) => {
  const arrTemp = text.toString().split(', ');
  const arrResult = []
  for (let i = 0; i < arrTemp.length; i++) {
    const data = arrTemp[i].toString().split(": ")
    const time = data[1].split(" - ")
    arrResult.push({
      date: data[0],
      time: {
        start: checkAMAndPM(time[0].split(" "))[0],
        end: checkAMAndPM(time[1].split(" "))[0],
      }
    })
  }
  return arrResult
}

export const getTimeAndUnit = (value) => {
  let [h, m] = value.split(":");
  const formatTime = h >= 12 ? 'PM' : 'AM'
  const time = (h % 12 ? h % 12 : 12) + ":" + m;

  const timeTemp = time.split(":");
  if (timeTemp[0].toString().length == 1) {
    return `0${timeTemp[0]}:${timeTemp[1]} ${formatTime}`
  } else {
    return `${time} ${formatTime}`
  }
}

export const convertDateInit = (d) => {

  let datestring = `${getHourOrMinutesString(d.getMonth()+1)}-${getHourOrMinutesString(d.getDate())}-${d.getFullYear()}`;
  return datestring
}
