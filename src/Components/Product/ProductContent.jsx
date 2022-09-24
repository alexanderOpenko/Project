import React from "react"
import {connect} from 'react-redux'
import ProductForm from "./ProductForm";
import {updateCart} from "../../Redux-reducers/cartReducer";
import {setVariantImages} from "../../Redux-reducers/ProductReducer";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

const ProductContent = (props) => {
    const productSubmit = (e) => {
       props.updateCart(e)
    }

    return <div className='product'>
        <div className='product__wrapper'>
            <div className='product__media'>
                {props.prodImages.map(el => {
                        return <div className='product__image'>
                            <TransformWrapper>
                                <TransformComponent>
                                    <img src={el}/>
                                </TransformComponent>
                            </TransformWrapper>
                        </div>
                    }
                )
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
                    product={props.product}
                    firstVariant={props.firstVariant}
                    colorIndex={props.product.params && props.product.params.indexOf('color')}
                    sizeIndex={props.product.params && props.product.params.indexOf('size')}
                />
            </div>
        </div>
    </div>
}

const mapStateToProps = () => {

}

export default connect(mapStateToProps(), {updateCart})(ProductContent)