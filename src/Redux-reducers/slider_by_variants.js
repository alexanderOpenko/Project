import request from "../API/api"

const SET_VARIANTS_SLIDER = 'SET_VARIANTS_SLIDER'

let defaultState = {
    sliderVariants: []
}

const variantsSlider = (state = defaultState, action) => {
    switch (action.type) {
        case SET_VARIANTS_SLIDER: return {
            ...state, sliderVariants: action.variants
        }

        default: return state
    }
}

export default variantsSlider
export const setVariantsPerSliderAction = (variants) => ({ type: 'SET_VARIANTS_SLIDER', variants })

export const assignSliderItemsWithVariants = (collectionPath) => (dispatch) => {
    request({ path: 'collection', params: { 'collection': collectionPath }, method: 'GET' })
        .then(collection => {
            const variantsPerSlider = []

            collection.forEach(el => {
                const firstAvailableVariant = el.modifications.find(mod => {
                    return mod.qty > 0
                })

                variantsPerSlider.push(firstAvailableVariant)
            })

            dispatch(setVariantsPerSliderAction(variantsPerSlider))
        })
    }