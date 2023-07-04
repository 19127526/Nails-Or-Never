import * as types from './index.constraints';
import {actionWithoutPayload, actionWithPayload} from "@/model/redux_action";


export const addItem = (payload : any) : actionWithPayload=>({
  type: types.ADD_ITEM_INTO_CART,
  payload
})



export const addItemCheckout = (payload : any) : actionWithPayload => ({
  type: types.ADD_ITEM_INTO_CART_CHECK_OUT,
  payload
})

export const removeItem=(payload : any)  : actionWithPayload=>({
  type: types.REMOVE_ITEM_INTO_CART,
  payload
})


export const removeAllItem=() : actionWithoutPayload=>({
  type: types.REMOVE_ALL_ITEM_INTO_CART,
})