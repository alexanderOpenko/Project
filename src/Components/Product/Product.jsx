import React from "react";
import { connect } from 'react-redux'
import './Product.css'
import { productRequest, updateProductPageContent } from "../../Redux-reducers/ProductReducer";
import ProductContent from "./ProductContent";

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadedClass: ''
        }
    }

    componentDidMount() {
        const prodId = this.props.match.params.id
        const varId = this.props.location.aboutProps ? this.props.location.aboutProps.variant_id : false

        this.setState({
            isLoadedClass: ''
        }, () => {
            this.props.productRequest(prodId, varId).then(() =>
                this.setState({
                    isLoadedClass: 'loaded '
                }))
        })
    }

    UNSAFE_componentWillMount() {
        this.props.updateProductPageContent({})
    }

    render() {
        return <div className={this.state.isLoadedClass}>
            <div className="preloader" ref={this.preloader}>
                <img src={require('../../Assets/Preloader.gif')} />
            </div>

            {
                (Object.keys(this.props.product).length ?
                    <ProductContent
                        prodImages={this.props.prodImages}
                        store={this.props.store}
                        product={this.props.product}
                        id={this.props.match.params.id}
                    />
                    : false)
            }
        </div>
    }
}

let mapStateToProps = (state) => {
    return ({
        product: state.productReducer.product,
        prodImages: state.productReducer.images
    })
}

export default connect(mapStateToProps, { productRequest, updateProductPageContent })(Product)