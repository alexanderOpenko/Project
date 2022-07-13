import React from 'react'
import {NavLink} from 'react-router-dom'
import './MapCollectionContent.css'
import CollectionForm from "./CollectionForm";

const MapCollectionContent = (props) => {
    const form = (e) => {
        console.log(e, 'formSubmit')
    }

    return <>
        <div className='collection'>
            {props.elementsObject.map((elem, i) => {
                const colorOptionsIndex = elem.params.indexOf('color')
                const sizeOptionsIndex = elem.params.indexOf('size')

                const firstAvailableVariant = elem.modifications.length ? elem.modifications.find(el => {
                    if (el.qty > 0) {
                        return el
                    }
                }) : false

                const firstVariantTitle = firstAvailableVariant.mod_title
                const main_photo = firstAvailableVariant.mod_images[0] || elem.main_photo
                const price = firstAvailableVariant.price || elem.price

                return <div key={i} className='collectionElement' data-element='sale-element'>
                    <CollectionForm
                        onSubmit={form}
                        main_photo={main_photo}
                        colorIndex={colorOptionsIndex}
                        sizeIndex={sizeOptionsIndex}
                        prod={elem}
                        price={price}
                        varTitle={firstVariantTitle}
                    />
                </div>
            })}
        </div>
    </>
}

export default MapCollectionContent