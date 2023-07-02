import axiosClient from "../axiosClient";
import axiosClientMulti from "../axiosClientMulti";



//parent vs child
export const getServices = async ({page}) => {
    return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_SERVICE_SUB+`?page=${page}`)
}




export const getListServicesByParentName = async ({name, page, limit}) => {
    return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_LIST_SERVICES_BY_PARENT_NAME_OR_ID + `?page=${page}&limit=${limit}&name=${name}`)
}

export const getListServicesById = async ({id, page, limit}) => {
    return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_LIST_SERVICES_BY_PARENT_NAME_OR_ID + `?page=${page}&limit=${limit}&id=${id}`)
}

export const getDetailParentServicesByParentName = async ({name}) =>{
    return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_DETAIL_PARENT_SERVICE_BY_PARENT_NAME_OR_ID + `?name=${name}`)
}

export const getDetailParentServicesById = async ({id}) =>{
    return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_DETAIL_PARENT_SERVICE_BY_PARENT_NAME_OR_ID + `?id=${id}`)
}


//parent
export const getServicesParentWithOutPagination = async () => {
    return await axiosClient.get(process.env.NEXT_PUBLIC_API_GET_SERVICES_PARENT_WITH_OUT_PAGINATION)
}

//update parent
export const putServiceParent = async (formData) => {
    return await axiosClientMulti.put(process.env.NEXT_PUBLIC_API_PUT_SERVICE_PARENT, formData)
}

//create parent
export const postServiceParent = async (formData) => {
    return await axiosClientMulti.post(process.env.NEXT_PUBLIC_API_POST_SERVICE_PARENT, formData)
}

//remove parent
export const deleteServiceParent = async ({id}) => {
    return await axiosClient.delete(process.env.NEXT_PUBLIC_API_DELETE_SERVICE_PARENT+`/${id}` )
}




//update parent
export const putServiceSub = async (formData) => {
    return await axiosClient.put(process.env.NEXT_PUBLIC_API_PUT_SERVICE_SUB, formData)
}

//create parent
export const postServiceSub = async (formData) => {
    return await axiosClient.post(process.env.NEXT_PUBLIC_API_POST_SERVICE_SUB, formData)
}

//remove parent
export const deleteServiceSub = async ({id}) => {
    return await axiosClient.delete(process.env.NEXT_PUBLIC_API_DELETE_SERVICE_SUB+`/${id}` )
}
//update sub




