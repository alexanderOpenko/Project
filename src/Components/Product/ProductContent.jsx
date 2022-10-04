import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import ProductForm from "./ProductForm";
import { updateCart } from "../../Redux-reducers/cartReducer";
import { setVariantImages } from "../../Redux-reducers/ProductReducer";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const ProductContent = (props) => {
    const [sizeSelectState, setSizeSelectState] = useState('')

    const productSubmit = (e) => {
        props.updateCart(e)
    }

    const clickCheck = (e) => {
        if (e.target.className !== 'product__size-select') {
            setSizeSelectState('')
        }
    }

    return <div className='product'
        onClick={clickCheck}
    >
        <div className='product__wrapper'>
            <div className='product__media'>
                {props.prodImages.map((el, i) => {
                    return <div key={i} className='product__image'>
                        <ProductImage el={el}/>
                    </div>
                })
                }
            </div>

            <div className='product__form'>
                <h2 className='product__form-prod-name'>
                    {props.product.name}
                </h2>
                <div className="product__price">
                    {props.product.price} $
                </div>

                <ProductForm
                    changeVariantImages={props.setVariantImages}
                    onSubmit={productSubmit}
                    id={props.id}
                    sizeSelectState={sizeSelectState}
                    setSizeSelectState={setSizeSelectState}
                    product={props.product}
                    colorIndex={props.product.params && props.product.params.indexOf('color')}
                    sizeIndex={props.product.params && props.product.params.indexOf('size')}
                />
            </div>
        </div>
    </div>
}

const ProductImage = (props) => {
    const [zoomScaleIndex, setZoomScaleIndex] = useState(0)
    const [panning, setPanning] = useState()

    useEffect(() => {
        if (zoomScaleIndex > 0) {
            setPanning({ disabled: false })
        } else if (zoomScaleIndex === 0) {
            setPanning({ disabled: true })
        }
    }, [zoomScaleIndex])

    const zoomInHandler = (zoom) => {
        zoom()

        if (zoomScaleIndex !== 5) {
            setZoomScaleIndex(zoomScaleIndex + 1)
        }
    }

    const zoomOutHandler = (zoom) => {
        zoom()

        if (zoomScaleIndex > 0) {
            setZoomScaleIndex(zoomScaleIndex - 1)
        }
    }

    return <TransformWrapper
        wheel={{ disabled: true }}
        panning={panning}
    >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
                <div className="zoom_buttons">
                    <button className='zoom_action btn' onClick={() => zoomInHandler(zoomIn)}>+</button>
                    <button className='zoom_action btn' onClick={() => zoomOutHandler(zoomOut)}>-</button>
                </div>
                <TransformComponent>
                    <img src={props.el} />
                </TransformComponent>
            </>
        )}
    </TransformWrapper>
}

const mapStateToProps = () => {

}

export default connect(mapStateToProps(), { setVariantImages, updateCart })(ProductContent)