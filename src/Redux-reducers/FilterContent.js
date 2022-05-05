import { clothesPhotoArray } from "../Components/clothes/clothes";
import { jeansPhoto } from "../Components/FrontPage/FrontPageSale/FrontPageSale"
import { hoodyPhoto } from "../Components/Hoody/hoody";
import { newItemsPhoto } from "../Components/News/News";
import { tshirtPhoto } from "../Components/Tshirts/Tshirts";
import { clothesCreator, jeansCreator, newItemsCreator } from "./contentReducer";
import { hoodyCreator } from "./contentReducer";
import { tshirtsCreator } from "./contentReducer";

export const filterContent = ( prop ) => (dispatch) => {

    let filterSaleError = 'Нажаль за Вашим запитом результатів немає';
    
    let filter = [];
    let contentTofilter;
    //фильтруется объект в зависимости от вида товара
    if(prop.filterType === 'jeans') {contentTofilter = jeansPhoto } else if
    (prop.filterType === 'hoody') {contentTofilter = hoodyPhoto } else if
    (prop.filterType === 'tshirt') {contentTofilter = tshirtPhoto } else if
    (prop.filterType === 'clothes') {contentTofilter = clothesPhotoArray } else if
    (prop.filterType === 'new') {contentTofilter = newItemsPhoto }

    if (filter.length === 0) {
        for (const value in prop) {
            const filerValue = prop[value]

            contentTofilter.filter(elem => {
                let isFiltered = elem.parameters.some(el => {
                    return el.options.some(opt => opt === filerValue)
                })

                if (isFiltered) {
                    if (!filter.find(el => el.id === elem.id)) {
                        return filter.push(elem)
                    }
                } else {
                    return false
                }
            })
    }
        console.log(filter, 'filter')
    }
    
    let argumentFilter = filter.length === 0 ? filterSaleError : filter
   
    //диспатчится экшн в зависимости от вида товара
    if(prop.filterType == 'jeans'){dispatch(jeansCreator(argumentFilter))} else if
    (prop.filterType === 'hoody') {dispatch(hoodyCreator(argumentFilter))} else if
    (prop.filterType === 'tshirt') {dispatch(tshirtsCreator(argumentFilter))} else if
    (prop.filterType === 'clothes'){dispatch(clothesCreator(argumentFilter))} else if
    (prop.filterType === 'new'){dispatch(newItemsCreator(argumentFilter))}
    
    }