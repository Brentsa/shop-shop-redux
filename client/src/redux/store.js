import {createStore} from 'redux';
import rootReducer from './reducer';

//can add in preloaded state from idb or localStorage if needed.

const store = createStore(rootReducer);

export default store;