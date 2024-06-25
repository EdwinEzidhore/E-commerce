import {  configureStore } from "@reduxjs/toolkit";
import SingleProductSlice from "./SingleProduct/SingleProductSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import AddressSlice from "./Address/AddressSlice";
import CartSlice from "./Cart/CartSlice";


const persistConfig = {
    key: 'root',
    version: 1,
    storage
}
const reducer = combineReducers({
  singleProduct: SingleProductSlice,
  address: AddressSlice,
  cart:CartSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'persist/PERSIST',
            'persist/REHYDRATE',
            'persist/REGISTER',
            'persist/PAUSE',
            'persist/PURGE',
            'persist/FLUSH',
          ],
        },
      }),
})

export  {store};