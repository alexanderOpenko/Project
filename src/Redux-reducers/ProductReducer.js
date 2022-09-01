import request from "../API/api";

const UPDATE_PRODUCT_PAGE = 'UPDATE_PRODUCT_PAGE'
const SET_FIRST_PRODUCT_VARIANT = 'SET_FIRST_PRODUCT_VARIANT'
const SET_VARIANT_IMAGES = 'SET_VARIANT_IMAGES'

let defaultState = {
    product: [],
    firstVariant: {},
    images: []
}

const ProductReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_PAGE:
            return {
                ...state, product: action.product
            }
        case SET_FIRST_PRODUCT_VARIANT:
            return {
                ...state, firstVariant: action.variant
            }
        case SET_VARIANT_IMAGES:
            return {
                ...state, images: action.images
            }
        default:
            return state;
    }
}

export default ProductReducer;
export const updateProductPageContent = (product) => ({type: 'UPDATE_PRODUCT_PAGE', product})
const firstAvailableVariant = (variant) => ({type: 'SET_FIRST_PRODUCT_VARIANT', variant})
export const setVariantImages = (images) => ({type: 'SET_VARIANT_IMAGES', images})

export const productRequest = (id) => (dispatch) => {
    request({path: 'collection', params: {'product_id': id}, method: 'GET'})
        .then(prod => {
            const firstVariant = prod[0].modifications.find(el => {return el.qty > 0})
            const variantImages = []

            firstVariant.mod_images.map(el => {
                return variantImages.push(el)
            })

            dispatch(setVariantImages(variantImages))
            dispatch(firstAvailableVariant(firstVariant))
            dispatch(updateProductPageContent(prod[0]))
        })
}