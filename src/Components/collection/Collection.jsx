import React from 'react'
import {connect} from 'react-redux'
import {hoodyObject, tshirtObject, newItemsObject, jeansObject} from '../../products/products'
import {collectionCreator} from '../../Redux-reducers/contentReducer'
import PagesContent from '../contentToMap/PagesContent'

class Collection extends React.Component {

    collectionRequest = () => {
        let collection = {}
        const collectionPath = this.props.match.path

        if (collectionPath === '/jeans') {
            collection = jeansObject
        } else if (collectionPath === '/tshirt') {
            collection = tshirtObject
        } else if (collectionPath === '/hoody') {
            collection = hoodyObject
        } else if (collectionPath === '/new') {
            collection = newItemsObject
        }

        this.props.collectionCreator(collection)
    }

    componentDidMount() {
        this.collectionRequest()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.path !== this.props.match.path) {
            this.collectionRequest()
        }
    }

    render() {

        return <PagesContent
            elementsObject={this.props.elementsObject}
            filterType={'jeans'}
            url={'/sale/saleJeans/'}/>
    }
}

let mapStateToProps = (state) => {
    return ({
        elementsObject: state.contentReducer.collectionContent,
    })
}

export default connect(mapStateToProps, {collectionCreator})(Collection)

