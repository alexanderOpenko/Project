import React from 'react'
import {connect} from 'react-redux'
import icons from '../../Pictures/icons'
import './cart.css'
import request from "../../API/api"
import {updateCartItemsAction} from "../../Redux-reducers/cartReduser"

const Cart = (props) => {
    // function decreaseItemQty (id) {
    //     const {var_id, prod_id} = id
    //     const data = {}
    //
    //     if (var_id) {
    //         data.variant_id = var_id
    //     } else {
    //         data.product_id = prod_id
    //     }
    //
    //     request({path: 'cart', method: 'DELETE',  dataForm: JSON.stringify(data)})
    //         .then((data) => {
    //             console.log(data, 'data')
    //         // props.updateCartItemsAction(data)
    //     })
    // }

    function increaseItemQty (id) {
        const {var_id, prod_id} = id
        const formData = new FormData()

        formData.append('variant_id', var_id)
        formData.append('product_id', prod_id)
        formData.append('quantity', 1)

        request({path: 'cart', method: 'POST',  dataForm: formData})
            .then(() => {
                request({path: 'cart', method: 'GET'})
                    .then((data) => {
                       props.updateCartItemsAction(data)
                        console.log('cart:', data) })
            })
    }

    const colorOptionsValues = ['color', 'колір', 'цвет']
    const sizeOptionsValues = ['size', 'розмір', 'размер']
    const closeIcon = icons('close')

    return <div className={props.cart ? 'hidden' : 'cart'}>
        <div className='cart__header'>
            <div className="cart__title">
                Cart
            </div>
            <div className="cart__close">
                {closeIcon}
            </div>
        </div>

        <div className="cart__content">
            {props.items.map((el, i) => {
                return <div key={i} className='cart__item'>
                <div className="cart__item-image">
                    <img src="" alt=""/>
                </div>

                <div className="cart__item-description">
                    <div className="cart__item-name body1">
                        {el.name}
                    </div>

                    <div className="cart__item-opts">
                        {
                            el.options.map((el, i) => {
                                const optName = Object.keys(el)[0]
                                const value = Object.values(el)[0]

                                if (colorOptionsValues.includes(optName)) {
                                    return <div key={i} className='cart__item-row'>
                                        <div className="cart__item-color-label">
                                            {optName}: {value}
                                        </div>

                                        <div className={'cart__item-opts-color cart__item-opts-color--' + value}>
                                        </div>
                                    </div>
                                }

                                if (sizeOptionsValues.includes(optName)) {
                                    return <div key={i} className='cart__item-row'>
                                        <div className="cart__item-opts-size">
                                            {optName}: {value}
                                        </div>
                                    </div>
                                }
                            })
                        }
                    </div>

                    <div className="cart__item-qty-dispatcher">
                        <button className="cart__item-qty-decrease stripBtn"
                                // onClick={() => decreaseItemQty({'var_id': el.mod_id, 'prod_id': el.prod_id})}
                        >
                            -
                        </button>

                        <span>
                           {el.line_quantity}
                        </span>

                        <button className="cart__item-qty-increase stripBtn"
                                data-prod-id={el.prod_id}
                                onClick={() => increaseItemQty({'var_id': el.mod_id, 'prod_id': el.prod_id})}
                        >
                            +
                        </button>
                    </div>
                </div>
                </div>
            })}
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return (
        {
            cart: state.cart.show,
            items: state.cart.items
        }
    )
}

export default connect(mapStateToProps, {updateCartItemsAction})(Cart);


