import React from "react"
import { connect } from 'react-redux'
import ProductForm, {productSizeError} from "./ProductForm";
import request from "../../API/api";
import {updateCartItemsAction} from "../../Redux-reducers/cartReduser";
import {setVariantImages} from "../../Redux-reducers/ProductReducer";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

const ProductContent = (props) => {
    const productSubmit = (e) => {
        if (!e.product_size) {
            productSizeError()
            return
        }

        const formData = new FormData
        formData.append('product_id', e.product_id)
        formData.append('variant_id', e.variant_id)
        formData.append('quantity', 1)

        request({path: 'cart', method: 'POST',  dataForm: formData})
            .then((data) => {
                if (data.code !== 5 ) {
                    props.store.dispatch(updateCartItemsAction(data.body))
                }
                console.log('cart:', data)
            })
    }

    return <div className='product'>
        <div className='product__wrapper'>
                    <div className='product__media'>
                        {props.variantImages.map(el => {
                                console.log(el,'el')

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
                            colorIndex={props.product.params.indexOf('color')}
                            sizeIndex={props.product.params.indexOf('size')}
                        />
                    </div>
                </div>
    </div>
}

const mapStateToProps = () => {

}

export default connect(mapStateToProps(), {setVariantImages})(ProductContent)