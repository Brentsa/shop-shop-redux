//import all-in-one function createSlice
import { createSlice } from "@reduxjs/toolkit";

//create a product slice with an initial state and it's own reducer functions
export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: []
    },
    reducers: {
        UPDATE_PRODUCTS(action){
            return {
                products: [ ...action.payload.products ]
            };
        }
    }
});

//export the reducer action functions for use in react components
export const {UPDATE_PRODUCTS} = productSlice.actions;

//export the reducer portion for the store
export default productSlice.reducer;