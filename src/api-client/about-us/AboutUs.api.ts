import axiosClient from "@/api-client/axiosClient";

export const getDetailAboutUs = () => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_ABOUT_US)
}