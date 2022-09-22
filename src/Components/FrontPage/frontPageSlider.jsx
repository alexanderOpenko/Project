import React from 'react'
import './frontpage.css'
import Slider from "react-slick";
import { useEffect } from 'react';
import { assignSliderItemsWithVariants } from '../../Redux-reducers/slider_by_variants';
import { connect } from 'react-redux';
import icons from '../../Assets/icons';

class FrontPageSlider extends React.Component {
    constructor(props) {
        super(props)

        this.sliderArrow = icons('slider_arrow')

        this.sliderRef = React.createRef()
      }

    componentDidMount() {
        this.props.assignSliderItemsWithVariants('t-shirts')
    }

    next = () => {
        this.sliderRef.current.slickNext();
    }

    previous = () => {
        this.sliderRef.current.slickPrev();
    }

    render() {
        const settings = {
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        }

        return (<div className='frontPage_slider'>
            <Slider {...settings}
                ref={this.sliderRef}
            >
                {this.props.variantsSlides.map((el, i) => {
                    return <div key={i} className='frontPage_slider-element'>
                        <img src={el.mod_images[0]} alt="" />
                    </div>
                })}
            </Slider>

        <div className="frontPage_slider-arrow-nav">
            <button className="stripBtn slider_arrow left_arrow" onClick={this.previous}>
                {this.sliderArrow}
            </button>
            <button className="stripBtn slider_arrow rigt_arrow" onClick={this.next}>
                {this.sliderArrow}
            </button>
        </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        variantsSlides: state.variantsSlider.sliderVariants
    })
}

export default connect(mapStateToProps, { assignSliderItemsWithVariants })(FrontPageSlider)