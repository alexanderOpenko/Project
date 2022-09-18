import{applyMiddleware,combineReducers, createStore} from 'redux'
import contentReducer from './contentReducer'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import cartReducer from './cartReduser';
import ProductReducer from './ProductReducer';
import navigationReducer from "./navigationReducer";
import filterReducer from './FilterContent';

let reducer = combineReducers ({
    productReducer: ProductReducer,
    contentReducer: contentReducer,
    filterReducer: filterReducer,
    cart: cartReducer,
    navigation: navigationReducer,
    form: formReducer
});

let store = createStore(reducer, applyMiddleware(thunkMiddleware))

window.store = store;

export default store;

