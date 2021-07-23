// // Initial state of the categories to be used by the store
// const initialState = {
//     categories: [],
//     currentCategory: ''
// }

//initialState is the default value of our one reducer function
// export default function categoriesReducer(state = initialState, action){
//     //switch statement to determine how the reducers is utilized
//     switch(action.type){
//         //Do something depending on the type of actions
        
//         case 'UPDATE_CATEGORIES':
//             return {
//                 ...state,
//                 categories: [ ...action.categories ]
//             }

//         case 'UPDATE_CURRENT_CATEGORY':
//             return {
//                 ...state,
//                 currentCategory: action.currentCategory
//             }

//         default: 
//             //return the state as it is if action is not recognized
//             return state;
//     }
// }

import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        currentCategory: ''
    },
    reducers: {
        UPDATE_CATEGORIES(state, action){
            return {
                ...state,
                categories: [ ...action.payload.categories ]
            };
        },
        UPDATE_CURRENT_CATEGORY(state,action){
            return {
                ...state,
                currentCategory: action.payload.currentCategory
            };
        }
    }
});

export const { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY} = categorySlice.actions;

export default categorySlice.reducer;