
// Initial state to be used by the store
const initialState = {
    cartOpen: false,
    cart: []
}

//initialState is the default value of our one reducer function
export default function shopReducer(state = initialState, action){
    //switch statement to determine how the reducers is utilized
    switch(action.type){
        //Do something depending on the type of actions

        case 'ADD_TO_CART': 
            return {
                ...state,
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
                ...state,
                cartOpen: (state.cart.length - 1) > 0, 
                cart: state.cart.filter(product => product._id !== action._id)
            }

        default: 
            //return the state as it is if action is not recognized
            return state;
    }
}

