import * as types from "./index.constraints"
import produce from "immer"

const initialState= {
  cartItem:[],
}


export const GiftCardPageReducer=(state=initialState, action)=>
    produce(state, draft => {
      switch (action.type) {
        case types.ADD_ITEM_INTO_CART:
          if(draft.cartItem.length===0) {
            draft.cartItem.push(action.payload);
          }
          else{
            let isFlag=false
            draft.cartItem.forEach(index => {
              if(index?.detailCart?.id === action.payload?.detailCart?.id)
              {
                isFlag=true;
                draft.cartItem.map(index => {
                  if(index?.detailCart?.id === action.payload?.detailCart?.id) {
                    index.quantity = index.quantity + action?.payload?.quantity;
                    index.price = action?.payload?.price
                  }
                })
                return;
              }
            })
            if(isFlag==false) {
              draft.cartItem.push(action.payload);
            }
          }
          break;
        case types.ADD_ITEM_INTO_CART_CHECK_OUT:
          let isFlag=false
          draft.cartItem.forEach(index => {
            if(index?.detailCart?.id === action.payload?.detailCart?.id)
            {
              isFlag=true;
              draft.cartItem.map(index => {
                if(index?.detailCart?.id === action.payload?.detailCart?.id) {
                  index.quantity = action?.payload?.quantity;
                  index.price = action?.payload?.price
                }
              })
              return;
            }
          })
          break;
        case types.REMOVE_ITEM_INTO_CART:
          const data = [...draft.cartItem]?.map(index => {
            if(index?.detailCart?.id == action.payload.detailCart?.id) {
              return undefined;
            }
            return index;
          }).filter(index => index != undefined);
          draft.cartItem = data
          break;
        case types.REMOVE_ALL_ITEM_INTO_CART:
          draft.cartItem=[];
          break;
        default:
          return state;
      }
    })