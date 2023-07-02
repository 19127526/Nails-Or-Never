import axiosClient from "@/api-client/axiosClient";

export const postContact = ({formData}) => {
    return axiosClient.post(process.env.NEXT_PUBLIC_API_POST_CONTACT, formData)
}