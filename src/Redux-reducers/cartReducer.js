import request from "../API/api.js"
import { productSizeError } from "../Components/Product/ProductForm.jsx"

const TOGGLE_CART = 'TOGGLE_CART'
const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS'
const UPDATE_CART_TOTAL_PRICE = 'UPDATE_CART_TOTAL_PRICE'
const UPDATE_CART_LENGTH = 'UPDATE_CART_LENGTH'

const initialState = {
    show: false,
    items: [],
    totalPrice: 0,
    itemsLength: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CART:
            return { ...state, show: action.toggle }
        case UPDATE_CART_ITEMS:
            return { ...state, items: action.items }
        case UPDATE_CART_TOTAL_PRICE:
            return { ...state, totalPrice: action.totalPrice }
        case UPDATE_CART_LENGTH:
            return { ...state, itemsLength: action.itemsCount }
        default:
            return state
    }
}

export const showBasketAction = (toggle) => ({ type: TOGGLE_CART, toggle })
export const updateCartItemsAction = (items) => ({ type: UPDATE_CART_ITEMS, items })
export const updateCartItemsTotalPriceAction = (totalPrice) => ({ type: UPDATE_CART_TOTAL_PRICE, totalPrice })
export const updateCartItemsCount = (itemsCount) => ({ type: UPDATE_CART_LENGTH, itemsCount })

export const getCartItems = () => (dispatch) => {
    request({ path: 'cart', method: 'GET' })
        .then((data) => {
            if (data.code !== 0) {
                dispatch(updateCartItemsAction(data.body.cart_items))
                dispatch(updateCartItemsTotalPriceAction(data.body.total_price))
                dispatch(updateCartItemsCount(data.body.items_length))
            }
        })
}

export const updateCart = (e) => (dispatch) => {
    const action = e.action || 'increase'

    if (!e.product_size && e.sizeRequire) {
        productSizeError()
        return
    } 

    const formData = new FormData
    formData.append('product_id', e.product_id)
    if (e.variant_id) {
        formData.append('variant_id', e.variant_id)
    }
    formData.append('action', action)
    formData.append('quantity', 1)

    request({ path: 'cart', method: 'POST', dataForm: formData })
        .then((data) => {
            if (data.code !== 5) {
                dispatch(updateCartItemsAction(data.body.cart_items))
                dispatch(updateCartItemsTotalPriceAction(data.body.total_price))
                dispatch(updateCartItemsCount(data.body.items_length))
                dispatch(showBasketAction(true))
                document.querySelector('body').classList.add('body_lock')
            } else {
                const warning = Object.keys(data.message)[0]

                alert(data.message[warning])
            }
        })
}

export default cartReducer
