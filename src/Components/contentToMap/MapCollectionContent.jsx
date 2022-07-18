import React from 'react'
import './MapCollectionContent.css'
import CollectionForm from "./CollectionForm";

const MapCollectionContent = (props) => {
    const form = (v) => {
        const onlySizeOptionProduct = false

        const id = v[Object.keys(v)[0]]
        const currentProduct = props.elementsObject.find(el => { return el.id === id})

        const currentProdCart = document.getElementById(id)
        const sizeOpt = 'size-' + id

        if (!v[sizeOpt]) {
            currentProdCart.querySelector('.sizeFields').style.borderColor = 'red'
            return
        }

        const titleArray = Object.values(v)
        titleArray.shift()
        const varTitle = titleArray.join('/')

        const variant = currentProduct.modifications.find(mod => {
             return  mod.mod_title === varTitle
            })

        console.log(variant.mod_id, 'varId')
    }

    return <>
        <div className='collection'>
            {props.elementsObject.map((elem, i) => {
                const colorOptionsIndex = elem.params.indexOf('color')
                const sizeOptionsIndex = elem.params.indexOf('size')

                const firstAvailableVariant = elem.modifications.length ? elem.modifications.find(el => {
                    return el.qty > 0
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