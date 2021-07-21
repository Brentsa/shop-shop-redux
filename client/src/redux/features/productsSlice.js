// Initial state of the products to be used by the store
const initialState = {
    products: []
}

//initialState is the default value of our one reducer function
export default function productsReducer(state = initialState, action){
    //switch statement to determine how the reducers is utilized
    switch(action.type){
        //Do something depending on the type of actions

        case 'UPDATE_PRODUCTS':
            return {
                products: [ ...action.products ]
            };
   
        default: 
            //return the state as it is if action is not recognized
            return state;
    }
}

// import { createSlice } from "@reduxjs/toolkit";

// const productSlice = createSlice({
//     name: 'product',
//     initialState,
//     reducers: {
//         UPDATE_PRODUCTS(state, action){
//             return {
//                 products: [ ...action.products ]
//             };
//         }
//     }
// });

// export const {createSlice} = productSlice.actions;

// export default productSlice.reducers;