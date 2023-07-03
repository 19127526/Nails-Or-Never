import axiosClient from "@/api-client/axiosClient";

export const getAllEmployee = () => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_ALL_EMPLOYEES as string)
}

export const getFreeTimeByEmIdAndDate = (employId : number, date : string) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_TIME_EMPLOYEE_BY_ID_AND_TIME as string+`/${employId}/${date}`)
}

export const getFreeTimeByDate = (date : string) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_TIME_EMPLOYEE_BY_TIME as string +`/${date}`)
}