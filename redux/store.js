import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import { AsyncStorage } from "react-native";


import { persistStore, persistReducer } from "redux-persist"
import { logger } from "redux-logger"

const persistConfig = {
    key:'root',
    storage: AsyncStorage,
    whitelist:['reducer']
}

const persistedReducer = persistReducer(persistConfig, reducer);


let store = createStore(persistedReducer, applyMiddleware(logger));

export const persistedStore = persistStore(store)

store.subscribe(()=> {
    store.getState();
    console.log(store.getState());
});

export default store;