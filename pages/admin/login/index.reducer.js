import produce from 'immer';
import * as types from './index.constraints';
import {niceNum} from "chart.js/helpers";



const initialState = {
  isLogin : false,
  message : null,
}


export const LoginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOGIN_SUCCESS:
        draft.isLogin = true;
        localStorage.getItem('token',action?.payload?.token)
        break;
      case types.LOGIN_FAIL:
        draft.isLogin = false
        break;
      case types.MESSAGE_AUTHEN:
        draft.message = action?.payload?.message;
        break;
      case types.CLEAR_MESSAGE_AUTHEN:
        draft.message = null;
        break;
      default:
        return state;
    }
  });
