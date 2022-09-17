import React from "react"
import { NavLink } from "react-router-dom"

const CollectionFormProduct = (props) => {
    const submitProdCartForm = (e) => {
        e.preventDefault()
        const formData = {}

        formData.product_id = e.target.querySelector('input').value
        props.submit(formData)
    }

    return <form id={props.productId} onSubmit={submitProdCartForm}>
        <input className='hidden-input' readOnly name={'product_id'} value={props.productId}/>

        <NavLink to={{
            pathname: `/collection/${props.collectionPath}/${props.productId}`,
        }}>
        </NavLink>
        <div className='ImageWrapper'>
            <img src={props.main_photo} />

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