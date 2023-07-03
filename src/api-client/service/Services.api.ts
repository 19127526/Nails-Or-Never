import axiosClient from "@/api-client/axiosClient";

export const getSubServicePagination = (page : number, limit : number) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_SERVICE_SUB as string+`?page=${page}&limit=${limit}`)
}