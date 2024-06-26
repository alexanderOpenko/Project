import request from "../API/api"

const UPDATE_COLLECTION_CONTENT = 'UPDATE_COLLECTION_CONTENT'
const ADD_FILTER_PARAMETERS = 'ADD_FILTER_PARAMETERS'
const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB'

let defaultState = {
    collectionContent: [],
    collectionFilterParameters: [],
    activeTab: 'About store'
}

const contentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_COLLECTION_CONTENT: return {
            ...state, collectionContent: action.content
        }
        case ADD_FILTER_PARAMETERS: return {
            ...state, collectionFilterParameters: action.parameters
        }
        case SET_ACTIVE_TAB: return {
            ...state, activeTab: action.tab
        }
        default: return state;
    }
}

export default contentReducer;

export const collectionCreator = (content) => ({ type: 'UPDATE_COLLECTION_CONTENT', content })
export const addCollectionFilterParameters = (parameters) => ({ type: 'ADD_FILTER_PARAMETERS', parameters })
export const setAboutPageActiveTab = (tab) => ({ type: 'SET_ACTIVE_TAB', tab })

export function getCollection (collectionPath) {
    return request({ path: 'collection', params: { 'collection': collectionPath }, method: 'GET' })
}

export const getCollectionAndFilterParams = (collectionPath) => (dispatch) => {
    return getCollection(collectionPath).then(collection => {
        dispatch(collectionCreator(collection))
        dispatch(setParameters(collection))
    })
}

const setParameters = (collection) => (dispatch) => {
    const parameters = []

    collection?.forEach(prod => {
        if (!prod.params) {
            return
        }

        prod.params.forEach((param, i) => {
            if (!parameters.some((el) => { return el.title === param })) {
                const characteristics = {
                    title: param,
                    options: prod.options[i]
                }

                parameters.push(characteristics)
            } else {
                parameters.forEach((el, index) => {
                    if (el.title === param) {
                        const concatOptions = prod.options[i].concat(el.options)

                        const updatedOptions = concatOptions.filter((item, pos) => {
                            return concatOptions.indexOf(item) === pos
                        })

                        el.options = updatedOptions
                    }
                })
            }
        })
    })

    dispatch(addCollectionFilterParameters(parameters))
}



