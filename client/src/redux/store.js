//import configure store function from the redux toolkit and reducer slices
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./features/cartSlice";
import productsReducer from "./features/productsSlice";
import categoriesReducer from "./features/categoriesSlice";

//Create a store using imported Reducer slices
//Global store object will be structured similar to the formatting below
const store = configureStore({
    reducer: {
        productState: productsReducer,
        categoryState: categoriesReducer,
        cartState: cartReducer
    }
})

//Export the store for use
export default store;