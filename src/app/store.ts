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


import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from "../reduce/reduce"

// Use noop storage for SSR compatibility
const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null)
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value)
        },
        removeItem(_key: string) {
            return Promise.resolve()
        },
    }
}

let storage: any;
try {
    if (typeof window !== 'undefined') {
        storage = require('redux-persist/lib/storage').default;
    } else {
        storage = createNoopStorage();
    }
} catch (e) {
    storage = createNoopStorage();
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['GiftCardPage'] // Only persist specific reducers if needed
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)


