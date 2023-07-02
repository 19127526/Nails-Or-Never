import * as actions from "./index.actions"
import {postSignIn} from "../../../api-client/authen/Authentication.api";


export const loginAccount = ({username, password}) => dispatch => {
  return postSignIn({username: username, password: password})
    .then((res) => {
       return dispatch(actions?.loginSuccess(res?.data?.user));
    })
    .catch((err) => {
      return dispatch(actions.loginFail());
    })
}



