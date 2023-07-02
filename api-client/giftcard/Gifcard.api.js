//parent vs child
import axiosClient from "../axiosClient";
import axiosClientMulti from "../axiosClientMulti";



export const getGiftCardPagination = async ({page, limit}) => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_GIFT_CARD_PAGI,{
    params : {
      page: page,
      limit: limit
    }
  })
}

export const postGiftCard = async (formData) => {
  return await axiosClientMulti.post(process.env.NEXT_PUBLIC_API_POST_GIFT_CARD, formData)
}

export const putGiftCard = async (formData) => {
  return await axiosClientMulti.put(process.env.NEXT_PUBLIC_API_PUT_GIFT_CARD, formData)
}

export const deleteGiftCard = async ({id}) => {
  return await axiosClient.delete(process.env.NEXT_PUBLIC_API_DELETE_GIFT_CARD+`/${id}`)
}

export const getDetailGiftCardById = async ({id}) => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_DETAIL_GIFT_CARD+`/${id}`)
}

export const getAllGiftCard = async () => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_ALL_GIFT_CARD)
}