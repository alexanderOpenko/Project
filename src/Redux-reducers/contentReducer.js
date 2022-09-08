const UPDATE_COLLECTION_CONTENT = 'UPDATE_COLLECTION_CONTENT'
const ADD_FILTER_PARAMETERS = 'ADD_FILTER_PARAMETERS'

let defaultState = {
    collectionContent: [],
    collectionFilterParameters: []
}

const contentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_COLLECTION_CONTENT: return {
            ...state, collectionContent: action.content
        }
        case ADD_FILTER_PARAMETERS: return {
            ...state, collectionFilterParameters: action.parameters
        }
        default: return state;
    }
}

export default contentReducer;

export const collectionCreator = (content) => ({ type: 'UPDATE_COLLECTION_CONTENT', content })
export const addCollectionFilterParameters = (parameters) => ({ type: 'ADD_FILTER_PARAMETERS', parameters })





