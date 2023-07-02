import axiosClient from "../axiosClient";
import axiosClientMulti from "../axiosClientMulti";

//parent
export const getListParentGallery = async ({pagination, page, limit}) => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_LIST_GALLERY_PARENT +
    `?pagination=${pagination}`)
}

export const getListSubGalleryByParentId = async ({id, page, limit}) => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_LIST_GALLERY_SUB_BY_PARENT + `?page=${page}&limit=${limit}&id=${id}`)
}

export const getListSubGalleryByParentTheme = async ({theme, page, limit}) => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_LIST_GALLERY_SUB_BY_PARENT + `?page=${page}&limit=${limit}&theme=${theme}`)
}

export const getDetailGalleryParentById = async ({id}) => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_DETAIL_GALLERY_PARENT_BY_ID + `/${id}`)
}

export const postGalleryParent = async (formData) => {
  return await axiosClientMulti.post(process.env.NEXT_PUBLIC_API_POST_GALLERY_PARENT, formData)
}

export const putGalleryParent = async (formData) => {
  return await axiosClientMulti.put(process.env.NEXT_PUBLIC_API_PUT_GALLERY_PARENT, formData)
}

export const deleteGalleryParentById = async ({id}) => {
  return await axiosClient.delete(process.env.NEXT_PUBLIC_API_DELETE_GALLERY_PARENT_BY_ID + `/${id}`)
}

//child
export const postGallerySub = async (formData) => {
  return await axiosClientMulti.post(process.env.NEXT_PUBLIC_API_POST_GALLERY_SUB, formData)
}

export const putGallerySub = async (formData) => {
  return await axiosClientMulti.put(process.env.NEXT_PUBLIC_API_PUT_GALLERY_SUB, formData)
}

export const deleteGallerySubById = async ({parentId, id}) => {
  return await axiosClient.delete(process.env.NEXT_PUBLIC_API_DELETE_GALLERY_SUB+`/${parentId}/${id}`)
}

export const getDetailGallerySubById = async ({id}) => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_DETAIL_GALLERY_SUB+`/${id}`)
}

export const getListGallerySub = async ({id, page, limit}) => {
  return await axiosClient.get(process.env.NEXT_PUBLIC_API_LIST_GALLERY_SUB+`/${id}?page=${page}&limit=${limit}`)
}


