// // Initial state of the cart to be used by the store
// const initialState = {
//     cartOpen: false,
//     cart: []
// }

// //initialState is the default value of our one reducer function
// export default function cartReducer(state = initialState, action){
//     //switch statement to determine how the reducers is utilized
//     switch(action.type){
        
//         //Do something depending on the type of actions
//         case 'ADD_TO_CART': 
//             return {
//                 cartOpen: true,
//                 cart: [...state.cart, action.product]
//             }

//         case 'ADD_MULTIPLE_TO_CART':
//             return {
//                 ...state,
//                 cart: [...state.cart, ...action.products]
//             }

//         case 'REMOVE_FROM_CART': 
//             return {
//                 cartOpen: (state.cart.length - 1) > 0, 
//                 cart: state.cart.filter(product => product._id !== action._id)
//             }

//         case 'UPDATE_CART_QUANTITY':
//             let newCart = state.cart.map(item => {
//                 if(item._id === action._id) {
//                     return{
//                         ...item,
//                         purchaseQuantity: action.purchaseQuantity
//                     }
//                 }

//                 return item;
//             })

//             return {
//                 cartOpen: true,
//                 cart: newCart
//             }
        
//         case 'CLEAR_CART':
//             return {
//                 cartOpen: false,
//                 cart: []
//             }

//         case 'TOGGLE_CART':
//             return {
//                 ...state,
//                 cartOpen: !state.cartOpen
//             }

//         default: 
//             //return the state as it is if action is not recognized
//             return state;
//     }
// }

import {createSlice} from '@reduxjs/toolkit';

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

export const {ADD_TO_CART, ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, CLEAR_CART, TOGGLE_CART} = cartSlice.actions;

export default cartSlice.reducer;