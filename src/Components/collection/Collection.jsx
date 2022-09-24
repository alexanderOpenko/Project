import React from 'react'
import { connect } from 'react-redux'
import { getCollectionAndFilterParams } from '../../Redux-reducers/contentReducer'
import CollectionContent from './collectionContent'

class Collection extends React.Component {

    collectionRequest = () => {
        const collectionPath = this.props.match.params.collection
        this.props.getCollectionAndFilterParams(collectionPath)
    }

    componentDidMount() {
        this.collectionRequest()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.collection !== this.props.match.params.collection) {
            this.collectionRequest()
        }
    }

    render() {
        return <CollectionContent
            collectionRequest={this.collectionRequest}
            parameters={this.props.parameters}
            store={this.props.store}
            elementsObject={this.props.elementsObject}
            filterType={'jeans'}
            url={'/sale/saleJeans/'}
            collectionPath={this.props.match.params.collection}
        />
    }
}

const mapStateToProps = (state) => {
    return ({
        elementsObject: state.contentReducer.collectionContent,
        parameters: state.contentReducer.collectionFilterParameters
    })
}

export default connect(mapStateToProps, { getCollectionAndFilterParams })(Collection)

