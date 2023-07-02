import axiosClient from "../axiosClient";
import axiosClientMulti from "../axiosClientMulti";


export const getALlEmployees = async () => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_ALL_EMPLOYEES)
}

export const putEmployees = async (formData) => {
  return await axiosClientMulti.put(process.env.NEXT_PUBLIC_API_PUT_EMPLOYEES, formData)
}

export const postEmployees = async (formData) => {
  return await axiosClientMulti.post(process.env.NEXT_PUBLIC_API_POST_EMPLOYEES, formData)
}

export const deleteEmployeesById = async ({id}) => {
  return await axiosClient.delete(process.env.NEXT_PUBLIC_API_DELETE_EMPLOYEES + `/${id}`)
}

export const getDetailEmployeesById = async ({id}) => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_DETAIL_EMPLOYEES + `/${id}`)
}
