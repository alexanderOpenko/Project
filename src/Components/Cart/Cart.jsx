import React from 'react'
import { connect } from 'react-redux'
import icons from '../../Assets/icons'
import './cart.css'
import { showBasketAction, updateCart } from "../../Redux-reducers/cartReducer"

const Cart = (props) => {
    function updateItemQty(data) {
        props.updateCart(data)
    }

    const colorOptionsValues = ['color', 'колір', 'цвет']
    const sizeOptionsValues = ['size', 'розмір', 'размер']
    const closeIcon = icons('close')
    const deleteIcon = icons('trash')

    return <div className={props.cart ? 'cart' : 'hidden'}>
        <div className='cart__header'>
            <div className="cart__title">
                Cart{props.itemsLength > 0 && ': ' + props.itemsLength}
            </div>
            <div className="cart__close" onClick={() => {
                props.showBasketAction(false)
                document.querySelector('body').classList.remove('body_lock')
            }}>
                {closeIcon}
            </div>
        </div>

        <div className="cart__header-announce">
            {props.totalPrice > 0 &&
                <div className="cart_total-price">
                    Total price: {props.totalPrice}$
                </div>}
        </div>

        <div className="cart__content">
            {props.items.map((el, i) => {
                const warningIcon = icons('warning')
                const warning = (el.warning ? Object.keys(el.warning)[0] : null)
                const warningValue = (warning ? el.warning[warning] : '')
                const itemImage = (el.mod_id ? el.mod_images[0] : el.main_photo)
                const isDisabledIncreaseBtn = !!warning
                // !el.available ? available = 'not-available' : available = ''
                const warningImageClass = (warning ? ` cart__item-image-warning--${warning}` : '')
                const cartItemWarning = (warning ? ` cart__item-warning--${warning}` : '')

                return <div key={i} className='cart__item'>
                    <div className={'cart__item-image'}>
                        <div className={'cart__item-image-warning' + warningImageClass}>
                            {warningIcon}
                        </div>

                        <img className='item-image' src={itemImage} alt="" />
                    </div>

                    <div className="cart__item-description">
                        <div className="cart__item-name body3">
                            {el.name}

                            <div className="cart__item-delete"
                                onClick={() => updateItemQty({ variant_id: el.mod_id, product_id: el.prod_id, action: 'delete' })}
                            >
                                {deleteIcon}
                            </div>
                        </div>

                        <div className="cart__item-opts">
                            {
                                el.options.map((el, i) => {
                                    const optName = Object.keys(el)[0]
                                    const value = Object.values(el)[0]

                                    if (colorOptionsValues.includes(optName)) {
                                        return <div key={i} className='cart__item-row'>
                                            <div className={'cart__item-opts-color cart__item-opts-color--' + value}>
                                            </div>
                                        </div>
                                    }

                                    if (sizeOptionsValues.includes(optName)) {
                                        return <div key={i} className='cart__item-row'>
                                            <div className="cart__item-opts-size">
                                                <span>{optName}: {value}</span>
                                            </div>
                                        </div>
                                    }
                                })
                            }
                        </div>

                        <div className="cart__item-qty-dispatcher">
                            <button className="cart__item-qty-decrease stripBtn"
                                onClick={() => updateItemQty({ variant_id: el.mod_id, product_id: el.prod_id, action: 'decrease' })}
                            >
                                -
                            </button>

                            <span>
                                {el.line_quantity}
                            </span>

                            <button className="cart__item-qty-increase stripBtn"
                                data-prod-id={el.prod_id}
                                onClick={() => updateItemQty({ variant_id: el.mod_id, product_id: el.prod_id, action: 'increase' })}
                                disabled={isDisabledIncreaseBtn}
                            >
                                +
                            </button>

                            <div className="cart__item-price">
                                {el.price} $
                            </div>
                        </div>

                        <div className={'cart-item-warning' + cartItemWarning}>
                            {warningValue}
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
            items: state.cart.items,
            totalPrice: state.cart.totalPrice,
            itemsLength: state.cart.itemsLength
        }
    )
}

export default connect(mapStateToProps, { showBasketAction, updateCart })(Cart);


