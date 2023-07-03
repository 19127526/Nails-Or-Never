import axiosClient from "@/api-client/axiosClient";

export const getGiftCardPagination = (page:number, limit : number) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_GIFT_CARD_PAGI as string+`?page=${page}&limit=${limit}`)
}

export const postCheckout = (form : any) => {
    return axiosClient.post(process.env.NEXT_PUBLIC_API_POST_CHECK_OUT_GIFT_CARD as string, form)
}