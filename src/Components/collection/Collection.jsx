import React from 'react'
import {connect} from 'react-redux'
import {collectionCreator} from '../../Redux-reducers/contentReducer'
import CollectionContent from '../contentToMap/collectionContent'
import request from "../../Api/api";

class Collection extends React.Component {
    collectionRequest = async () => {
        const collectionPath = this.props.match.path.slice(12)

        await request('collection.php', 'collection', collectionPath, 'GET')
            .then((res) => {
                console.log('Success:', res)
                this.props.collectionCreator(res)
            })
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
        return <CollectionContent
            elementsObject={this.props.elementsObject}
            filterType={'jeans'}
            url={'/sale/saleJeans/'}/>
    }
}

let mapStateToProps = (state) => {
    //console.log(state, 'state')
    return ({
        elementsObject: state.contentReducer.collectionContent,
    })
}

export default connect(mapStateToProps, {collectionCreator})(Collection)

