import React from 'react'
import Slider from "react-slick";
import { assignSliderItemsWithVariants } from '../../Redux-reducers/slider_by_variants';
import { connect } from 'react-redux';
import icons from '../../Assets/icons';
import { NavLink } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

class FrontPageSlider extends React.Component {
    constructor(props) {
        super(props)

        this.sliderArrow = icons('slider_arrow')

        this.sliderRef = React.createRef()
    }

    componentDidMount() {
        AOS.init()
        this.props.assignSliderItemsWithVariants(this.props.collectionPath)
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
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 425,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        }

        return (<div className='frontPage_slider'
            data-aos="fade-up"
            data-aos-duration="1200"
        >
            <h1 className='frontPage_slider-title body1'>
                Scroll & explore
            </h1>

            <Slider {...settings}
                ref={this.sliderRef}
            >
                {this.props.variantsSlides.map((el, i) => {
                    return <div key={i} className='frontPage_slider-element'>
                        <img className='frontPage_slider-element-image' src={el.mod_images[0]} alt="" />
                        <NavLink to={{ pathname: `/collection/${this.props.collectionPath}/${el.prod_id}` }}>
                            <h4>{el.prod_name}</h4>
                        </NavLink>
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