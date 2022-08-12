const TOGGLE_CART = 'TOGGLE_CART'
const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS'

const initialState = {
    show: false,
    items: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CART:
            let toggle
            state.show === true ? toggle = false : toggle = true
            return {...state, show: toggle}
        case UPDATE_CART_ITEMS:
            return {...state, items: action.items}
        default:
            return state
    }
}

export const showBasketAction = (cartToggle) => ({type: TOGGLE_CART, cartToggle})
export const updateCartItemsAction = (items) => ({type: UPDATE_CART_ITEMS, items})

export default cartReducer
