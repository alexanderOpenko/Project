import React from 'react'
import { NavLink } from 'react-router-dom'
import icons from '../../Assets/icons'
import './hero.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Hero = () => {
    const arrowIcon = icons('slider_arrow')

    useEffect(() => {
        AOS.init()
      }, [])

    const scrollToSection = () => {
        const heroHeight = document.querySelector('.hero').clientHeight
        window.scrollTo({ top: heroHeight - 60, behavior: "smooth" })
    }

    return (<div className='hero' data-aos="fade" data-aos-duration="500">
        <div className='hero-img'>
            <img src={require('../../Assets/person_jacket.jpeg')} alt="" />
        </div>

        <div className='medium_hidden_large_visible'>
            <button onClick={scrollToSection} className='hero-scrol_arrow stripBtn'>
                {arrowIcon}
            </button>
        </div>

        <div className='hero-text'>
            <div className="hero-text_wrapper">
                <div className="hero-text_title">
                    <h1>New arrivals</h1>
                </div>

                <div className="hero-text_subtitle">
                    <h5>Are you ready <br /> now for this new trends ?</h5>
                </div>

                <NavLink to={'/collection/ALL'}>
                    <button className="hero-text_button btn">
                        Shop all
                    </button>
                </NavLink>
            </div>
        </div>
    </div>
    )
}

export default Hero