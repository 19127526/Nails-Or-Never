import * as types from './index.constraints';


export const addItem=(payload)=>({
  type: types.ADD_ITEM_INTO_CART,
  payload
})

export const addItemCheckout = (payload) => ({
  type: types.ADD_ITEM_INTO_CART_CHECK_OUT,
  payload
})

export const removeItem=(payload)=>({
  type: types.REMOVE_ITEM_INTO_CART,
  payload
})


export const removeAllItem=()=>({
  type: types.REMOVE_ALL_ITEM_INTO_CART,
})