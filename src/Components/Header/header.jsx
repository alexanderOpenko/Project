import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'
import { showBasketAction } from '../../Redux-reducers/cartReduser'
import icons from "../../Assets/icons";

const Header = (props) => {
    const [mobileMenuState, setMobileMenuState] = useState('')
    const [activeHeaderBackground, setActiveHeaderBackground] = useState('')
    const cartIcon = icons('cart')
    const burgerIcon = icons('burger-menu')
    const closeIcon = icons('close')
    const navlincs = ['T-shirts', 'Jeans', 'Hoodies', 'About']

    useEffect(() => {
        window.addEventListener('resize', checkSize)
        window.addEventListener('scroll', checkScroll)

        function checkScroll () {
            if (window.scrollY > 35) {
                setActiveHeaderBackground(' active_header_background')
            } else {
                setActiveHeaderBackground('')
            }
        }

        function checkSize () {
            const windowWidth = window.innerWidth

            if (windowWidth > 998) {
                setMobileMenuState('')
            }
        }
    })

    function basketToggle() {
        props.store.dispatch(showBasketAction(true))
        document.querySelector('body').classList.add('body_lock')
    }

    return <div className={'header' + mobileMenuState + activeHeaderBackground}
            
    >
        <div className='header_base'>
            <div className='header_burger-icon large_hidden_medium_visible'
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
                    <h4 className='logo_body'>
                        streeter
                    </h4>
                </NavLink>
            </div>

            <div className="header_nav">
                {navlincs.map((el, i) => {
                    return <div key={i} className="header_nav-item">
                        <NavLink to={'/collection/' + el}>
                            <div className="body3">
                                {el}
                            </div>
                        </NavLink>
                    </div>
                })}
            </div>

            <div className='header_cart-icon' onClick={basketToggle}>
                {cartIcon}
                <div className='header_cart-icon-size'>
                </div>
            </div>
        </div>

        <div className="header_mobile-menu invisible">
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