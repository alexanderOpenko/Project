import{applyMiddleware,combineReducers, createStore} from 'redux'
import contentReducer from './contentReducer'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import cartReducer from './cartReduser';
import PageReducer from './PageReducer';
import navigationReducer from "./navigationReducer";

let reducer = combineReducers ({
    PageReducer: PageReducer,
    contentReducer: contentReducer,
    cart: cartReducer,
    navigation: navigationReducer,
    form: formReducer
});

let store = createStore(reducer, applyMiddleware(thunkMiddleware))

window.store = store;

export default store;

