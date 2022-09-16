const TOGGLE_CART = 'TOGGLE_CART'
const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS'
const UPDATE_CART_TOTAL_PRICE = 'UPDATE_CART_TOTAL_PRICE'

const initialState = {
    show: false,
    items: [],
    totalPrice: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CART:
            return { ...state, show: action.toggle }
        case UPDATE_CART_ITEMS:
            return { ...state, items: action.items }
        case UPDATE_CART_TOTAL_PRICE:
            return { ...state, totalPrice: action.totalPrice }
        default:
            return state
    }
}

export const showBasketAction = (toggle) => ({ type: TOGGLE_CART, toggle })
export const updateCartItemsAction = (items) => ({ type: UPDATE_CART_ITEMS, items })
export const updateCartItemsTotalPriceAction = (totalPrice) => ({ type: UPDATE_CART_TOTAL_PRICE, totalPrice })

export default cartReducer
