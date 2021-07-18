import React, {createContext, useContext} from 'react';
import { useProductReducer } from './reducers';

//Provider is used to wrap our application so that state can be used everywhere
//Consumer is used by components to grab the state date
const StoreContext = createContext();
const {Provider} = StoreContext;

//instantiating the global state
const StoreProvider = ({value = [], ...props}) => {

    //state is the most up to date version of our global state object
    //dispatch is a method used to update the state
    const [state, dispatch] = useProductReducer({
        products: [],
        categories: [], 
        currentCategory: '',
        cartOpen: false,
        cart: []
    });

    return <Provider value={[state, dispatch]}{...props}/>;
}

const useStoreContext = () => {
    return useContext(StoreContext);
}

export {StoreProvider, useStoreContext};