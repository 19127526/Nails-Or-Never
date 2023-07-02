import axiosClient from "@/api-client/axiosClient";

//parent
export const getGalleryPagination = ({page, limit}) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_LIST_GALLERY_PARENT+`?page=${page}&limit=${limit}&pagination=1`)
}


//child
export const getAllSubGalleryByParentTheme = ({theme}) => {
    return axiosClient.get(process.env.NEXT_PUBLIC_API_GET_LIST_GALLERY_SUB_BY_PARENT+`?page=1&limit=9999999&theme=${theme}`)
}