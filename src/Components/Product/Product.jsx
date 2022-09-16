import React from "react";
import { connect } from 'react-redux'
import './Product.css'
import {productRequest, updateProductPageContent} from "../../Redux-reducers/ProductReducer";
import ProductContent from "./ProductContent";

class Product extends React.Component {
    componentDidMount() {
        this.props.productRequest(this.props.match.params.id)
    }

    componentWillMount() {
        this.props.updateProductPageContent({})
    }

    render() {
        return <>
            {
                (Object.keys(this.props.product).length ?
                    <ProductContent
                    firstVariant={this.props.firstVariant}
                    variantImages={this.props.variantImages}
                    store={this.props.store}
                    product={this.props.product}
                    id={this.props.match.params.id}
                />
                : false)
            }
        </>
    }
}

let mapStateToProps = (state) => {
    return ({
        product: state.productReducer.product,
        firstVariant: state.productReducer.firstVariant,
        variantImages: state.productReducer.images
    })
}

export default connect(mapStateToProps, {productRequest, updateProductPageContent})(Product)