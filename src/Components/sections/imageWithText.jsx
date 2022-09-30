import React from 'react'
import Accordion from './accordion'
import './imageWithText.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';

const ImageWithText = () => {
    useEffect(() => { 
        AOS.init()
      }, [])

    return (<div className='imageAndText'>
        <div className='imageAndText-text'>
            <h5 className='imageAndText_preheading body3'
                data-aos="fade-up"
                data-aos-duration="1500"
            > 
                Be unique
            </h5>

            <h1 className='imageAndText-title body1'
                data-aos="fade-up"
                data-aos-duration="1500"
            >
                 Make your look unmainstream.
            </h1>

            <Accordion />
        </div>

        <div className='imageAndText-image-wrapper margin-left'
            data-aos="fade-up"
            data-aos-duration="1200" 
        >
            <img className='imageAndText-image' src={require('../../Assets/men in white jaket.jpeg')} alt="" />
        </div>
    </div>
    )
}

export default ImageWithText