//import {createStore} from 'redux';
//import rootReducer from './reducer';

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./features/cartSlice";
import productsReducer from "./features/productsSlice";
import categoriesReducer from "./features/categoriesSlice";

//const store = createStore(rootReducer);

const store = configureStore({
    reducer: {
        productState: productsReducer,
        categoryState: categoriesReducer,
        cartState: cartReducer
    }
})

export default store;