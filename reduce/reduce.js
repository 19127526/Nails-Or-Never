import {combineReducers} from "redux";
import {LoadingReducer} from "../components/loading/index.reducer"
import {LoginReducer} from "../pages/admin/login/index.reducer";


const rootReducer = combineReducers({
    LoadingPage : LoadingReducer,
    LoginPage : LoginReducer
})

export default rootReducer