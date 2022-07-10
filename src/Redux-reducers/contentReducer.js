const UPDATE_COLLECTION_CONTENT = 'UPDATE_COLLECTION_CONTENT'

let defaultState = {
    collectionContent: [],
}

const contentReducer = (state = defaultState, action) => {
    switch(action.type){
    case UPDATE_COLLECTION_CONTENT: {
        return {
            ...state, collectionContent: action.content
        }
    } 

    default: return state;
    }
}

export default contentReducer;

export  const collectionCreator = (content) =>
({type: 'UPDATE_COLLECTION_CONTENT', content} );




