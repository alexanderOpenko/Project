import{applyMiddleware,combineReducers, createStore} from 'redux'
import contentReducer from './contentReducer'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import basketReducer from './basketReduser';
import PageReducer from './PageReducer';

let reducer = combineReducers ({
    PageReducer: PageReducer,
    contentReducer: contentReducer,
    basket: basketReducer,
    form: formReducer
});

let store = createStore(reducer, applyMiddleware(thunkMiddleware))

window.store = store;

export default store;

