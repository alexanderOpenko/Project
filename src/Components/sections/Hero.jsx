import React from 'react'
import icons from '../../Assets/icons'
import './hero.css'

const Hero = () => {
    const arrowIcon = icons('slider_arrow')

    const scrollToSection = () => {
        const heroHeight = document.querySelector('.hero').clientHeight
        console.log(heroHeight, 'heroHeight');
        window.scrollTo({ top: heroHeight - 60, behavior: "smooth" })
    }

    return (<div className='hero'>
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

                <button className="hero-text_button btn">
                    Shop all
                </button>
            </div>
        </div>
    </div>
    )
}

export default Hero