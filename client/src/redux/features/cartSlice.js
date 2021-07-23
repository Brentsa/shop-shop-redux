//import all-in-one function createSlice
import {createSlice} from '@reduxjs/toolkit';

//create a cart slice with an initial state and it's own reducer functions
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartOpen: false,
        cart: []
    },
    reducers: {
        ADD_TO_CART(state, action){
            return {
                cartOpen: true,
                cart: [...state.cart, action.payload.product]
            }
        },
        ADD_MULTIPLE_TO_CART(state, action){
            return {
                ...state,
                cart: [...state.cart, ...action.payload.products]
            }
        },
        REMOVE_FROM_CART(state, action){
            return {
                cartOpen: (state.cart.length - 1) > 0, 
                cart: state.cart.filter(product => product._id !== action.payload._id)
            }
        },
        UPDATE_CART_QUANTITY(state, action){
            let newCart = state.cart.map(item => {
                if(item._id === action.payload._id) {
                    return{
                        ...item,
                        purchaseQuantity: action.payload.purchaseQuantity
                    }
                }

                return item;
            })

            return {
                cartOpen: true,
                cart: newCart
            }
        },
        CLEAR_CART(){
            return {
                cartOpen: false,
                cart: []
            }
        },
        TOGGLE_CART(state){
            return {
                ...state,
                cartOpen: !state.cartOpen
            }
        }
    }
});

//export the reducer action functions for use in react components
export const {ADD_TO_CART, ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, CLEAR_CART, TOGGLE_CART} = cartSlice.actions;

//export the reducer portion for the store
export default cartSlice.reducer;