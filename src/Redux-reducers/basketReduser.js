const UPDATE_BASKET = 'UPDATE_BASKET'
const UPDATE_ELEMENT_BASKET = 'UPDATE_ELEMENT_BASKET'
const UPDATE_SIZE_BASKET = 'UPDATE_SIZE_BASKET'
const UPDATE_PRICE_BASKET = 'UPDATE_PRICE_BASKET'

let initialState = {
    show: false,
    basketElements:[],
    basketSize: '',
    totalCount: ''
}

const basketReducer = (state = initialState, action) => {
    switch(action.type){
      case UPDATE_BASKET:
        return { ...state, show: action.bulean }
      case UPDATE_ELEMENT_BASKET: 
        return {...state, basketElements: action.object}
      case UPDATE_SIZE_BASKET: 
      return {...state, basketSize: action.size}
      case UPDATE_PRICE_BASKET:
          return {...state, totalCount: action.totalCount }
        default: return state
    }

} 

export const showBasketAction = (bulean) => ({type: UPDATE_BASKET, bulean});
export const addElementBasketAction = (object) => ({type: UPDATE_ELEMENT_BASKET, object})
export const addElementBaskeSizeAction = (size) => ({type: UPDATE_SIZE_BASKET, size})
export const addBaskeTotalPriceAction = (totalCount) => ({type: UPDATE_PRICE_BASKET, totalCount})
export default basketReducer

export const addElementToBasket = (prop) => (dispatch) => {

    let elementsBasket;
    let db
    let openRequest = indexedDB.open("tovaru", 1);

    openRequest.onupgradeneeded = function() {
         db = openRequest.result

            if(!db.objectStoreNames.contains('items')) {
                let objectStore = db.createObjectStore('items',{keyPath: 'keys'} ) 
            }
           
        }

  openRequest.onsuccess = function () {
        db = openRequest.result

    
//добавить товар в корзину
    if(prop.data) {
    let transaction = db.transaction('items', 'readwrite')
    let items = transaction.objectStore('items','reawrite')

    let item = prop.data //элемент который нужно добавить

    let key = Math.floor(Math.random() * 20) // генерирую ключ для каждого добавленного объекта
    item.keys = key // добавляю ключ в объект. этот объект отобразится в корзине
    let request = items.add(item)

    request.onsuccess = () => {
        //cоздаю хранилище цены и диспатчу в стор
        if(!localStorage.getItem('totalCount')) {
            localStorage.setItem('totalCount', 0)}

        let addCount = Number(localStorage.getItem('totalCount'))
         
         addCount = addCount + Number(item.price) 
         localStorage.setItem('totalCount', addCount)
        let general = localStorage.getItem('totalCount')
        dispatch(addBaskeTotalPriceAction(general))
    } 
    request.onerror = function() {
        alert("Ошибка", request.error);
      };

    let requestTwo = items.getAll()

    requestTwo.onsuccess = function () {
        elementsBasket  = requestTwo.result
        dispatch(addElementBasketAction(elementsBasket))
      //длинна масива с объектами в корзине это количество товара
        localStorage.setItem('lengthItems', elementsBasket.length)
        let lengthItems =  Number(localStorage.getItem('lengthItems'))
        dispatch(addElementBaskeSizeAction(lengthItems))
      }     
}
//удалить товар из корзины
    if(prop.deleteElem){
    let transaction = db.transaction('items', 'readwrite')
    let items = transaction.objectStore('items','readwrite')
    let deleteElemWithKey = prop.deleteElem.elem //тут ключ которыя я сгенерировал
      
    let remove = items.delete(deleteElemWithKey)
   
    remove.onsuccess = function() {
        
        let request = items.getAll()
        request.onsuccess = function () {
             elementsBasket = request.result 
             dispatch(addElementBasketAction(elementsBasket))
             localStorage.setItem('lengthItems', elementsBasket.length)
        let lengthItems = Number(localStorage.getItem('lengthItems'))
        dispatch(addElementBaskeSizeAction(lengthItems))
            
    }
   
      let addCount = Number(localStorage.getItem('totalCount'))
    
      addCount = addCount - Number(prop.deleteElem.deletePrice) 
      localStorage.setItem('totalCount', addCount)
     let general = localStorage.getItem('totalCount')
     dispatch(addBaskeTotalPriceAction(general))
  
} 
    }

//отобразить корзину
    if(prop.showBasket) {
    let transaction = db.transaction('items', 'readwrite')
    let items = transaction.objectStore('items','readwrite')
        let ask = items.getAll()  
        ask.onsuccess = function () {
            elementsBasket  = ask.result
            dispatch(addElementBasketAction(elementsBasket))
        localStorage.setItem('lengthItems', elementsBasket.length)
        let lengthItems =  Number(localStorage.getItem('lengthItems'))
        dispatch(addElementBaskeSizeAction(lengthItems))
         
    }

      let addCount = Number(localStorage.getItem('totalCount'))

      dispatch(addBaskeTotalPriceAction(addCount))
} 
    }  
  }
