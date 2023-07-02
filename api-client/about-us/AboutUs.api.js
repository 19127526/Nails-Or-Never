import axiosClient from "../axiosClient";

export const getAboutUs = async () => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_ABOUT_US)
}

export const putAboutUs = async ({id, name, description, working_hour, tel, email, address, footage}) => {
  return await axiosClient.put(process.env.NEXT_PUBLIC_API_PUT_ABOUT_US + `/${id}`,{
    name,
    description,
    working_hour,
    tel,
    email,
    address,
    footage
  })
}