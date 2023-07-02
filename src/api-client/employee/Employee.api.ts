import axiosClient from "@/api-client/axiosClient";

export const getAllEmployee = () => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_ALL_EMPLOYEES)
}

export const getFreeTimeByEmIdAndDate = ({employId, date}) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_TIME_EMPLOYEE_BY_ID_AND_TIME +`/${employId}/${date}`)
}

export const getFreeTimeByDate = ({date}) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_TIME_EMPLOYEE_BY_TIME +`/${date}`)
}