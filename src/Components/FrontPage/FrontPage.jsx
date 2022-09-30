import React from 'react'
import './frontpage.css'
import FrontPageSlider from "../sections/sliderByVariants"
import ImageWithText from '../sections/imageWithText'
import Hero from '../sections/Hero'

const FrontPage = () => {
  return(<>
    <Hero />
    <div className='frontpage-content'>
    <FrontPageSlider collectionPath={'t-shirts'}/>
    <ImageWithText />
    </div>
    </>
  )
}

export default FrontPage


