
// Initial state to be used by the store
const initialState = {
    categories: [],
    currentCategory: ''
}

//initialState is the default value of our one reducer function
export default function categoriesReducer(state = initialState, action){
    //switch statement to determine how the reducers is utilized
    switch(action.type){
        //Do something depending on the type of actions
        
        case 'UPDATE_CATEGORIES':
            return {
                ...state,
                categories: [ ...action.categories ]
            }

        case 'UPDATE_CURRENT_CATEGORY':
            return {
                ...state,
                currentCategory: action.currentCategory
            }

        default: 
            //return the state as it is if action is not recognized
            return state;
    }
}
