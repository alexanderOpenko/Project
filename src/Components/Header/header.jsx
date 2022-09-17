import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'
import { showBasketAction } from '../../Redux-reducers/cartReduser'
import icons from "../../Assets/icons";

const Header = (props) => {
    const [mobileMenuState, setMobileMenuState] = useState('')
    const cartIcon = icons('cart')
    const burgerIcon = icons('burger-menu')
    const closeIcon = icons('close')
    const navlincs = ['T-shirts', 'Jeans', 'Hoodies', 'About']

    useEffect(() => {
        window.addEventListener('resize', checkSize)

        function checkSize() {
            const windowWidth = window.innerWidth

            if (windowWidth > 998) {
                setMobileMenuState('')
                return window.removeEventListener('resize', checkSize)
            }
        }
    })

    function basketToggle() {
        props.store.dispatch(showBasketAction(true))
        document.querySelector('body').classList.add('body_lock')
    }

    return <div className={'header' + mobileMenuState}>
        <div className='header_base'>
            <div className='header_burger-icon hidden'
                onClick={() => setMobileMenuState(' active-mobile-menu')}
            >
                {burgerIcon}
            </div>

            <div className='header_close-icon hidden'
                onClick={() => setMobileMenuState('')}
            >
                {closeIcon}
            </div>

            <div className='logo'>
                <NavLink to='/'>
                    <div className='logo_body'>
                        streeter
                    </div>
                </NavLink>
            </div>

            <div className="header_nav">
                {navlincs.map((el, i) => {
                    return <div key={i} className="header_nav-item">
                        <NavLink to={'/collection/' + el}>{el}</NavLink>
                    </div>
                })}
            </div>

            <div className='header_cart-icon' onClick={basketToggle}>
                {cartIcon}
                <div className='header_cart-icon-size'>
                </div>
            </div>
        </div>

        <div className="header_mobile-menu hidden">
            <div className="header_mobile-nav-wrapper">
                <div className="header_mobile-nav">
                    {navlincs.map((el, i) => {
                        return <div key={i} className="header_mobile-nav-item"
                                onClick={() => setMobileMenuState('')}
                        >
                            <NavLink to={'/collection/' + el}>{el}</NavLink>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default Header;