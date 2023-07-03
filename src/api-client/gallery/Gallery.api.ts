import axiosClient from "@/api-client/axiosClient";

//parent
export const getGalleryPagination = (page : number, limit : number) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_LIST_GALLERY_PARENT as string+`?page=${page}&limit=${limit}&pagination=1`)
}


//child
export const getAllSubGalleryByParentTheme = (theme : string) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_LIST_GALLERY_SUB_BY_PARENT as string+`?page=1&limit=9999999&theme=${theme}`)
}