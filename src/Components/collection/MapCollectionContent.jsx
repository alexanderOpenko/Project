import React from 'react'
import './MapCollectionContent.css'
import CollectionFormVariants from "./CollectionFormVariants"
import CollectionFormProduct from "./CollectionFormProduct"
import { updateCart } from "../../Redux-reducers/cartReducer"

const MapCollectionContent = (props) => {
    const submitCollectionProductCart = (data) => {
        props.store.dispatch(updateCart(data))
    }

    return <>       
        <div className='collection'>
            {props.elementsObject.map((elem, i) => {
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
                
                if (elem.params) {
                    if (elem.params.includes('color')) {
                        var colorOptionsIndex = elem.params.indexOf('color')
                        var colorOpt = 'opt' + (colorOptionsIndex + 1)
                    }

                    if (elem.params.includes('size')) {
                        var sizeOptionsIndex = elem.params.indexOf('size')
                    }
                }

                const firstVariantColor = firstVariant[colorOpt]

                return <div key={i} className='collectionElement' data-element='sale-element'>
                    {
                        (firstVariant && (colorOptionsIndex != undefined || sizeOptionsIndex != undefined)) ?
                            <CollectionFormVariants
                                submit={submitCollectionProductCart}
                                main_photo={main_photo}
                                colorIndex={colorOptionsIndex}
                                sizeIndex={sizeOptionsIndex}
                                prod={elem}
                                price={price}
                                varTitle={firstVariantTitle}
                                firstVariantColor={firstVariantColor}
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