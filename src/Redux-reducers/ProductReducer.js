import request from "../API/api";

const UPDATE_PRODUCT_PAGE = 'UPDATE_PRODUCT_PAGE'
const SET_VARIANT_IMAGES = 'SET_VARIANT_IMAGES'

let defaultState = {
    product: [],
    images: []
}

const ProductReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_PAGE:
            return {
                ...state, product: action.product
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
export const updateProductPageContent = (product) => ({ type: 'UPDATE_PRODUCT_PAGE', product })
export const setVariantImages = (images) => ({ type: 'SET_VARIANT_IMAGES', images })

export const productRequest = (prodId, varId = null) => (dispatch) => {
    request({ path: 'collection', params: { 'product_id': prodId }, method: 'GET' })
        .then(prod => {
            if (prod[0].modifications.length) {
                var firstVariant = prod[0].modifications.find(el => {
                    if (varId) {
                        return el.mod_id == varId
                    } else {
                        return el.qty > 0
                    }
                })
                var images = []

                firstVariant.mod_images.map(el => {
                    return images.push(el)
                })
            } else {
                var images = prod[0].images
            }

            prod[0].firstVariant = firstVariant
            
            dispatch(updateProductPageContent(prod[0]))
            dispatch(setVariantImages(images))
        })
}