


import axiosClient from "@/api-client/axiosClient";





export const postBooking = (form) => {
    return axiosClient.post(process.env.NEXT_PUBLIC_API_POST_BOOKING,form)
}