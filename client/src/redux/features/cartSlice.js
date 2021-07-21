
// Initial state to be used by the store
const initialState = {
    cartOpen: false,
    cart: []
}

//initialState is the default value of our one reducer function
export default function cartReducer(state = initialState, action){
    //switch statement to determine how the reducers is utilized
    switch(action.type){
        //Do something depending on the type of actions

        case 'ADD_TO_CART': 
            return {
                cartOpen: true,
                cart: [...state.cart, action.product]
            }

        case 'ADD_MULTIPLE_TO_CART':
            return {
                ...state,
                cart: [...state.cart, ...action.products]
            }

        case 'REMOVE_FROM_CART': 
            return {
                cartOpen: (state.cart.length - 1) > 0, 
                cart: state.cart.filter(product => product._id !== action._id)
            }

        case 'UPDATE_CART_QUANTITY':
            let newCart = state.cart.map(item => {
                if(item._id === action._id) {
                    return{
                        ...item,
                        purchaseQuantity: action.purchaseQuantity
                    }
                }

                return item;
            })

            return {
                cartOpen: true,
                cart: newCart
            }
        
        case 'CLEAR_CART':
            return {
                cartOpen: false,
                cart: []
            }

        case 'TOGGLE_CART':
            return {
                ...state,
                cartOpen: !state.cartOpen
            }

        default: 
            //return the state as it is if action is not recognized
            return state;
    }
}

