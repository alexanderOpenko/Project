import React from 'react'
import './MapCollectionContent.css'
import CollectionFormVariants from "./CollectionFormVariants"
import CollectionFormProduct from "./CollectionFormProduct"
import request from "../../API/api"
import { updateCartItemsAction, showBasketAction, updateCartItemsTotalPriceAction } from "../../Redux-reducers/cartReduser"

const MapCollectionContent = (props) => {
    const submitCollectionProductCart = (data) => {
        const formData = new FormData
        
        formData.append('product_id', data.product_id)
        if (data.variant_id) {
            formData.append('variant_id', data.variant_id)
        }
        formData.append('quantity', 1)

        request({ path: 'cart', method: 'POST', dataForm: formData })
            .then((data) => {
                if (data.code !== 5 && data.code !== 0) {
                    console.log(data, 'data');
                    props.store.dispatch(updateCartItemsAction(data.body.cart_items))
                    props.store.dispatch(updateCartItemsTotalPriceAction(data.body.total_price))
                    props.store.dispatch(showBasketAction(true))
                    document.querySelector('body').classList.add('body_lock')
                } else {
                    const warning = Object.keys(data.message)[0]

                    alert(data.message[warning])
                }
            })
    }

    return <>
        <div className='collection'>
            {props.elementsObject.map((elem, i) => {
                if (elem.params) {
                    if (elem.params.includes('color')) {
                        var colorOptionsIndex = elem.params.indexOf('color')
                    }

                    if (elem.params.includes('size')) {
                        var sizeOptionsIndex = elem.params.indexOf('size')
                    }
                }

                var firstVariant = ''

                if (elem.modifications.length) {
                    var firstAvailableVariant = elem.modifications.find(el => {
                        return el.qty > 0
                    })

                    firstVariant = firstAvailableVariant || elem.modifications[0]

                    var firstVariantTitle = firstVariant.mod_title
                    var main_photo = firstVariant.mod_images[0]
                    var price = firstVariant.price
                }

                return <div key={i} className='collectionElement' data-element='sale-element'>
                    {
                        (firstVariant && (colorOptionsIndex != undefined|| sizeOptionsIndex != undefined)) ?
                            <CollectionFormVariants
                                submit={submitCollectionProductCart}
                                main_photo={main_photo}
                                colorIndex={colorOptionsIndex }
                                sizeIndex={sizeOptionsIndex }
                                prod={elem}
                                price={price}
                                varTitle={firstVariantTitle}
                                firstVariant={firstVariant}
                                collectionPath={props.collectionPath}
                            />
                            :
                            <CollectionFormProduct
                                submit={submitCollectionProductCart}
                                main_photo={elem.main_photo}
                                price={elem.price}
                                collectionPath={props.collectionPath}
                                productId={elem.id}
                                name={elem.name}
                            />
                    }
                </div>
            })}
        </div>
    </>
}

export default MapCollectionContent