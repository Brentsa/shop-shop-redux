//import all-in-one function createSlice
import { createSlice } from "@reduxjs/toolkit";

//create a category slice with an initial state and it's own reducer functions
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

//export the reducer action functions for use in react components
export const { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY} = categorySlice.actions;

//export the reducer portion for the store
export default categorySlice.reducer;