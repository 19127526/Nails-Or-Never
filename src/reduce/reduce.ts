import {combineReducers} from "redux";
import {GiftCardPageReducer} from "@/pages/gift-card/index.reducer";
import {LoadingReducer} from "@/components/loading/index.reducer";


const rootReducer = combineReducers({
    GiftCardPage : GiftCardPageReducer,
    LoadingPage : LoadingReducer,
})

export default rootReducer