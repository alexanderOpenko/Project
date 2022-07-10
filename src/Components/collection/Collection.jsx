import React from 'react'
import {connect} from 'react-redux'
import {collectionCreator} from '../../Redux-reducers/contentReducer'
import CollectionContent from '../contentToMap/collectionContent'
import $ from "jquery";

class Collection extends React.Component {

    collectionRequest = () => {
        const collectionPath = this.props.match.path.slice(12)

        const promise1 = new Promise((resolve, reject) => $.ajax({
                type: 'GET',
                url: "http://localhost:8888/store/collection.php?",
                data: {collection: collectionPath},
                header: 'Content-Type: application/json',
                success: function(data) {
                    resolve(data)
                }
            })
        )

        promise1.then((value) => {
            const data = JSON.parse(value)
            console.log(data)
            this.props.collectionCreator(data)
        });
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
    return ({
        elementsObject: state.contentReducer.collectionContent,
    })
}

export default connect(mapStateToProps, {collectionCreator})(Collection)

