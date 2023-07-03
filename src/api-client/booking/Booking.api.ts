


import axiosClient from "@/api-client/axiosClient";





export const postBooking = (form:any) => {
    return axiosClient.post(process.env.NEXT_PUBLIC_API_POST_BOOKING as string,form)
}