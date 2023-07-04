import {combineReducers} from "redux";
import {LoadingReducer} from "../components/loading/index.reducer"


const rootReducer = combineReducers({
    LoadingPage : LoadingReducer,
})

export default rootReducer