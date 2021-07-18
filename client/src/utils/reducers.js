import {useReducer} from 'react';
import { 
    UPDATE_PRODUCTS, 
    UPDATE_CATEGORIES, 
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from "./actions";


export const reducer = (state, action) => {
    switch(action.type){
        //if we are updating products then copy the state to the new state and give it the new products category
        case UPDATE_PRODUCTS: 
            return {
                ...state,
                products: [...action.products]
            };

        //if we are updating the categories array, then we spread the state and update the categories with a new array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };

        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]
            };
        
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products]
            };
        
        case REMOVE_FROM_CART:
            let newCart = state.cart.filter(item => item._id !== action._id)

            return {
                ...state,
                cartOpen: newCart.length > 0,
                cart: newCart
            };

        case UPDATE_CART_QUANTITY: 
            let updatedCart = state.cart.map(item => {
                if(item._id === action._id){
                    item.purchaseQuantity = action.purchaseQuantity;
                }
                return item;
            });

            return {
                ...state,
                cartOpen: true,
                cart: updatedCart
            };

        case CLEAR_CART: 
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            }

        //if we are not updating anything then we do not update state at all
        default:
            return state;
    }
}

export function useProductReducer(initialState){
    return useReducer(reducer, initialState);
}