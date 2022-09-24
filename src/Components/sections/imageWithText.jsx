import React from 'react'
import Accordion from './accordion'
import './imageWithText.css'

const ImageWithText = () => {
    return (<div className='imageAndText'>
        <div className='imageAndText-text'>
            <h5 className='imageAndText_preheading body3'> 
                Be unique
            </h5>

            <h1 className='imageAndText-title body1'>
                 Make your look unmainstream.
            </h1>

            <Accordion />
        </div>

        <div className='imageAndText-image-wrapper margin-left'>
            <img className='imageAndText-image' src={require('../../Assets/men in white jaket.jpeg')} alt="" />
        </div>
    </div>
    )
}

export default ImageWithText