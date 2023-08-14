import {combineReducers} from "redux";
import {GiftCardPageReducer} from "@/pages/gift-card/index.reducer";


const rootReducer = combineReducers({
    GiftCardPage : GiftCardPageReducer,
})

export default rootReducer