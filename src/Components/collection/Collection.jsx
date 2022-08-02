import React from 'react'
import {connect} from 'react-redux'
import {collectionCreator} from '../../Redux-reducers/contentReducer'
import CollectionContent from '../contentToMap/collectionContent'
import request from "../../API/api";

class Collection extends React.Component {
    collectionRequest = () => {
        const collectionPath = this.props.match.params.collection

          request({path: 'collection', params: {'collection': collectionPath}, method: 'GET'}).then(res => {
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

