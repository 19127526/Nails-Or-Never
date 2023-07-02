// import {applyMiddleware, compose, createStore} from "redux";
// import storage from 'redux-persist/lib/storage';
// import {persistReducer, persistStore} from "redux-persist";
// import rootReducer from "../reduce/Reduce"
// import thunk from "redux-thunk";
//
// const composeEnhancers =
//     typeof window === "object" &&
//     process.env.NODE_ENV === "development" &&
//     (window)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//         ? (window)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//         : compose
//
//
// const persistConfig = {
//     key: 'root',
//     storage: storage,
// };
//
// const pReducer = persistReducer(persistConfig, rootReducer);
// const enhancer = composeEnhancers(applyMiddleware(thunk))
// export const store = createStore(pReducer, enhancer);
// export const persistor = persistStore(store);


import {applyMiddleware, createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from '../reduce/reduce'
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const enhancer = applyMiddleware(thunk)
export const store = createStore(persistedReducer, enhancer)
export const persistor = persistStore(store)


