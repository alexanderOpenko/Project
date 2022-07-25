import React from 'react'
import './MapCollectionContent.css'
import CollectionForm from "./CollectionForm";
import $ from "jquery";
import request from "../../Api/api";

const MapCollectionContent = (props) => {

    const form = (v) => {
        const onlySizeOptionProduct = false
        const id = v[Object.keys(v)[0]]
        const currentProdCart = document.getElementById(id)
        const sizeOpt = 'size-' + id

        if (!v[sizeOpt]) {
            currentProdCart.querySelector('.sizeFields').style.borderColor = 'red'
            return
        }

        const titleArray = Object.values(v)
        titleArray.shift()
        const varTitle = titleArray.join('/')
        const currentProduct = props.elementsObject.find(el => { return el.id === id})
        const variant = currentProduct.modifications.find(mod => {
             return  mod.mod_title === varTitle
            })

        const formData = new FormData
        formData.append('product_id', id)
        formData.append('variant_id', variant.mod_id)
        formData.append('quantity', 1)

        request( 'cart.php', false, false, 'POST',  formData)
            .then((result) => {
                console.log('Success:', result) })
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
                {console.log(firstVariantTitle, 'firstVariantTitle')}
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