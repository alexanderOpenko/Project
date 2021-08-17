const UPDATE_NEW_PHOTO_SALE_GALLERY = 'UPDATE_NEW_PHOTO_SALE_GALLERY'
const UPDATE_ACCESSORIES_OBJECT = 'UPDATE_ACCESSORIES_OBJECT'
const UPDATE_NEW_ITEMS_OBJECT = 'UPDATE_NEW_ITEMS_OBJECT'
const UPDATE_CLOTHES_OBJECT = 'UPDATE_CLOTHES_OBJECT'
const UPDATE_HOODY_OBJECT = 'UPDATE_HOODY_OBJECT'
const UPDATE_JEANS_OBJECT = 'UPDATE_JEANS_OBJECT'
const UPDATE_TSHIRTS_OBJECT = 'UPDATE_TSHIRTS_OBJECT'

let defaultState = {
    galleryJeansPhoto: [], 
    newItems: [],
    clothes: [],
    hoody: [],
    jeans: [],
    tshirts: [],
    Accessories: []
}

const contentReducer = (state = defaultState, action) => {
    switch(action.type){
    case UPDATE_NEW_PHOTO_SALE_GALLERY: {
        return {
            ...state, galleryJeansPhoto: action.photo
        }
    } 
    case UPDATE_ACCESSORIES_OBJECT: {
        return {
            ...state, Accessories:action.object
        }
    }
    case UPDATE_NEW_ITEMS_OBJECT: {
        return {
            ...state, newItems:action.object
        }
    }
    case UPDATE_CLOTHES_OBJECT: {
        return {
            ...state, clothes:action.object
        }
    }
    case UPDATE_HOODY_OBJECT: {
        return {
            ...state, hoody:action.object
        }
    }
    case UPDATE_JEANS_OBJECT: {
        return {
            ...state, jeans:action.object
        }
    }
    case UPDATE_TSHIRTS_OBJECT: {
        return {
            ...state, tshirts:action.object
        }
    }
    
          
    default: return state;
    }
}

export default contentReducer;

export  const updateNewPhotoSaleGalleryCreator = (photo) => 
({type: 'UPDATE_NEW_PHOTO_SALE_GALLERY', photo} );

export const newItemsCreator = (object) => (
    {type: 'UPDATE_NEW_ITEMS_OBJECT', object }
)
export const clothesCreator = (object) => (
    {type: 'UPDATE_CLOTHES_OBJECT', object }
)
export const hoodyCreator = (object) => (
    {type: 'UPDATE_HOODY_OBJECT', object }
)
export const jeansCreator = (object) => (
    {type: 'UPDATE_JEANS_OBJECT', object }
)
export const tshirtsCreator = (object) => (
    {type: 'UPDATE_TSHIRTS_OBJECT', object }
)
export const accessoriesCreator = (object) => (
    {type: 'UPDATE_ACCESSORIES_OBJECT', object }
)



