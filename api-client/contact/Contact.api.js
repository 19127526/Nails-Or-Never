import axiosClient from "../axiosClient";

export const getAllContact = async () => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_CONTACT_PAGI)
}

export const deleteContactById = async ({id}) => {
  return await axiosClient.delete(process.env.NEXT_PUBLIC_API_DELETE_CONTACT + `/${id}`)
}