import * as types from './index.constraints';


export const loginSuccess = (payload)  => ({
  type: types.LOGIN_SUCCESS,
  payload
});

export const loginFail = () => ({
  type: types.LOGIN_FAIL
});

export const messageAuthen = (payload) => ({
  types: types.MESSAGE_AUTHEN,
  payload
})

export const clearMessageAuthen = () => ({
  types: types.CLEAR_MESSAGE_AUTHEN,
})
