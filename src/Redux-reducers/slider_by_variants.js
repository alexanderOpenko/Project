import { getCollection } from "./contentReducer"

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
    getCollection(collectionPath)
        .then(collection => {
            const variantsPerSlider = []

            !!collection && collection.forEach(el => {
                const firstAvailableVariant = el.modifications.find(mod => {
                    return mod.qty > 0
                })

                firstAvailableVariant.prod_id = el.id
                firstAvailableVariant.prod_name = el.name
                variantsPerSlider.push(firstAvailableVariant)
            })

            dispatch(setVariantsPerSliderAction(variantsPerSlider))
        })
    }