import React from 'react'
import './hero.css'

const Hero = () => {
    return (<div className='hero'>
        <div className='hero-img'>
            <img src={require('../../Assets/person_jacket.jpeg')} alt="" />
        </div>

        <div className='hero-text'>
            <div className="hero-text_wrapper">
                <div className="hero-text_title">
                    <h1>New arrivals</h1>
                </div>

                <div className="hero-text_subtitle">
                    <h5>Are you ready <br/> now for this new trends ?</h5>
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