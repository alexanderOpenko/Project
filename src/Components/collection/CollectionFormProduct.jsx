import React from "react"
import { NavLink } from "react-router-dom"
import LazyLoad from 'react-lazyload'
import { useState } from "react"
import { useEffect } from "react"

const CollectionFormProduct = (props) => {
    const [preloaderVisibility, setPreloaderVisibility] = useState('')

    useEffect(() => {
        setPreloaderVisibility('')

        setTimeout(() => {
            setPreloaderVisibility(' invisible')
        }, 2000)
    }, [props])

    const submitProdCartForm = (e) => {
        e.preventDefault()
        const formData = {}

        formData.product_id = e.target.querySelector('input').value
        props.submit(formData)
    }

    return <form id={props.productId} onSubmit={submitProdCartForm}>
        <input className='hidden-input' readOnly name={'product_id'} value={props.productId} />

        <NavLink to={{
            pathname: `/collection/${props.collectionPath}/${props.productId}`,
        }}>
        </NavLink>
        <div className='ImageWrapper'>
            <div className={"preloaderWrapper" + preloaderVisibility}>
                <img className='product_imgPreloader' src={require('../../Assets/Preloader.gif')} />
            </div>

            <LazyLoad>
            <img src={props.main_photo} />
            </LazyLoad>

            <div className="productCartSubmit">
                <button type="submit" className="stripBtn productCartSubmitButton" value="submit">
                    +
                </button>
            </div>
        </div>

        <div className='productInfo'>
            <div className='productName'>{props.name}</div>
            <div className='productPrice'>{props.price} $</div>
        </div>
    </form>
}

export default CollectionFormProduct;