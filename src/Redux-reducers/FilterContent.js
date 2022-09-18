import request from "../API/api"
import { collectionCreator } from "./contentReducer"

const UPDATE_FILTER_STATE = 'UPDATE_FILTER_STATE'

let defaultState = {
    isFiltered: false
}

const filterReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_FILTER_STATE: return {
            ...state, isFiltered: action.isFiltered
        }
        default: return state
    }
}

const setFilterStateAction = (isFiltered) => ({type: 'UPDATE_FILTER_STATE', isFiltered})

export default filterReducer

export const filterContent = (props) => (dispatch) => {
    const filteredVariants = []
    const filteredProducts = []
    var collection = []
    const { params } = props
    const paramsKeys = []
    const paramsValues = []

    for (const key in params) {
        paramsKeys.push(key)
        paramsValues.push(params[key])
    }

    request({path: 'collection', params: {'collection': props.collectionPath}, method: 'GET'})
    .then(res => {
        collection = res
        getVariantsByFilterOptions()
        getProductOfVariants()
        dispatch(collectionCreator(filteredProducts))
        dispatch(setFilterStateAction(true))
    })

    function getVariantsByFilterOptions () {
        for (const product of collection) {
            loopV: for (let v = 0; v < product.modifications.length; v++) {
                const variant = product.modifications[v]

                for (let i = 0; i < paramsKeys.length; i++) {
                    const opt = 'opt' + (product.params.indexOf(paramsKeys[i]) + 1)

                    if (paramsValues[i].some(el => { return variant[opt] === el })) {
                        const isFound = filteredVariants.some(el => {
                            return el.mod_title === variant.mod_title
                        })

                        if (!isFound && variant.qty > 0) {
                            filteredVariants.push(variant)
                        }
                    } else if (i + 1 === paramsKeys.length) {
                        filteredVariants.some((el, i) => {
                            if (el.mod_title === variant.mod_title) {

                                filteredVariants.splice(i, 1)
                            }
                        })
                    } else {
                        continue loopV
                    }
                }
            }
        }
    }

    function getProductOfVariants() {
        for (const product of collection) {
            for (const variant of filteredVariants) {
                product.modifications.forEach(el => {
                    if (el.mod_title === variant.mod_title && el.qty > 0) {

                        const isFound = filteredProducts.some(prod => {
                            return prod.id === product.id
                        })

                        if (!isFound) {
                            filteredProducts.push(product)
                        }
                    }
                })
            }
        }
    }
}