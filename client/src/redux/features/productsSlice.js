
// Initial state to be used by the store
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
                products: { ...action.products }
            };
   
        default: 
            //return the state as it is if action is not recognized
            return state;
    }
}
