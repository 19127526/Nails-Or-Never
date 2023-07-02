import axiosClient from "@/api-client/axiosClient";

export const getGiftCardPagination = ({page, limit}) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_GIFT_CARD_PAGI+`?page=${page}&limit=${limit}`)
}

export const postCheckout = (form) => {
    return axiosClient.post(process.env.NEXT_PUBLIC_API_POST_CHECK_OUT_GIFT_CARD, form)
}