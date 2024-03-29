import{applyMiddleware,combineReducers, createStore} from 'redux'
import contentReducer from './contentReducer'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import cartReducer from './cartReducer';
import ProductReducer from './ProductReducer';
import filterReducer from './FilterContent';
import variantsSlider from './slider_by_variants';

const reducer = combineReducers ({
    variantsSlider: variantsSlider,
    productReducer: ProductReducer,
    contentReducer: contentReducer,
    filterReducer: filterReducer,
    cart: cartReducer,
    form: formReducer
});

let store = createStore(reducer, applyMiddleware(thunkMiddleware))

window.store = store;

export default store;

