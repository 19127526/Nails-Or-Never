import axiosClient from "../axiosClient";

export const getBookingByDate = ({date}) => {
  return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_BOOKING_BY_DATE+`/${date}`)
}

export const deleteBookingById = ({id}) => {
  return axiosClient.delete(process.env.NEXT_PUBLIC_API_DELETE_BOKING_BY_ID + `/${id}`)
}