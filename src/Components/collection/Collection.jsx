import React from 'react'
import { connect } from 'react-redux'
import { collectionCreator, addCollectionFilterParameters } from '../../Redux-reducers/contentReducer'
import CollectionContent from './collectionContent'
import request from "../../API/api";

class Collection extends React.Component {

    collectionRequest = () => {
        const collectionPath = this.props.match.params.collection

        request({ path: 'collection', params: { 'collection': collectionPath }, method: 'GET' })
            .then(collection => {

                console.log(collection, 'collection');
                this.props.collectionCreator(collection)
                const parameters = []

                collection.forEach(prod => {
                    if (!prod.params) {
                        return
                    }
                    
                    prod.params.forEach((param, i) => {
                        if (!parameters.some((el) => { return el.title === param })) {
                            const characteristics = {
                                title: param,
                                options: prod.options[i]
                            }

                            parameters.push(characteristics)
                        } else {
                            parameters.forEach((el, index) => {
                                if (el.title === param) {
                                    const concatOptions = prod.options[i].concat(el.options)

                                    const updatedOptions = concatOptions.filter((item, pos) => {
                                        return concatOptions.indexOf(item) === pos
                                    })

                                    el.options = updatedOptions
                                }
                            })
                        }
                    })
                })

                this.props.addCollectionFilterParameters(parameters)
            })
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

export default connect(mapStateToProps, { collectionCreator, addCollectionFilterParameters })(Collection)

