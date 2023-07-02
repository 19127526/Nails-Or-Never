import axiosClient from "@/api-client/axiosClient";

export const getSubServicePagination = ({page, limit}) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_SERVICE_SUB+`?page=${page}&limit=${limit}`)
}