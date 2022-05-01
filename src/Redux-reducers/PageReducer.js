const UPDATE_PHOTO_PAGE = 'UPDATE_PHOTO_PAGE'

let defaultState = {
    page: [],
}

const PageReducer = (state = defaultState, action) => {
    switch(action.type){
    case UPDATE_PHOTO_PAGE: {
        return {
            ...state, page: action.photo
        }
    } 
   
          
    default: return state;
    }
}

export default PageReducer;
export  const updatePhotoPageCreator = (photo) => 
({type: 'UPDATE_PHOTO_PAGE', photo});