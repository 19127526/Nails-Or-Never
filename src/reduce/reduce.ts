import {combineReducers} from "redux";
import {LoadingReducer} from "@/components/loading/index.reducer";
import {GiftCardPageReducer} from "@/pages/gift-card/index.reducer";


const rootReducer = combineReducers({
    LoadingPage : LoadingReducer,
    GiftCardPage : GiftCardPageReducer,
})

export default rootReducer