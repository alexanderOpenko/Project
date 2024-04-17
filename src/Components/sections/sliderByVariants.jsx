import React from 'react'
import { assignSliderItemsWithVariants } from '../../Redux-reducers/slider_by_variants';
import { connect } from 'react-redux';
import icons from '../../Assets/icons';
import 'swiper/css'
import { NavLink } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

class FrontPageSlider extends React.Component {
    constructor(props) {
        super(props)

        this.previous = React.createRef()
        this.next = React.createRef()
    }

    componentDidMount() {
        AOS.init()
        this.props.assignSliderItemsWithVariants(this.props.collectionPath)
    }

    render() {
        return (<div className='frontPage_slider'
            data-aos="fade-up"
            data-aos-duration="1200"
        >
            <h1 className='frontPage_slider-title body1'>
                Scroll & explore
            </h1>

            <Swiper 
             slidesPerView={1.4} 
             spaceBetween={5}
             loop={true}
             modules = {[Navigation]}
             navigation = {{
                prevEl: this.previous.current,
                nextEl: this.next.current
             }}

             breakpoints={{
                767: { 
                    slidesPerView: 3
                },
                425: {
                    slidesPerView: 2
                }
             }}
             >
                {this.props.variantsSlides.map((el, i) => {
                    return <SwiperSlide className='frontPage_slider-element'>
                            <NavLink to={{ pathname: `/collection/${this.props.collectionPath}/${el.prod_id}` }}>

                            <img className='frontPage_slider-element-image' src={el.mod_images[0]} alt="" />
                                <h4>{el.prod_name}</h4>
                            </NavLink>
                    </SwiperSlide>          
                })}
            </Swiper>

            <div className="frontPage_slider-arrow-nav">
                <button ref={this.previous} className="stripBtn slider_arrow left_arrow">
                    {icons('slider_arrow')}
                </button>
                <button ref={this.next} className="stripBtn slider_arrow rigt_arrow">
                    {icons('slider_arrow')}
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