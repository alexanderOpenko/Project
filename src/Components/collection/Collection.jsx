import React from 'react'
import { connect } from 'react-redux'
import { hoodyObject, tshirtObject, newItemsObject, jeansObject } from '../../products/products'
import { collectionCreator } from '../../Redux-reducers/contentReducer'
import PagesContent from '../contentToMap/PagesContent'

class Collection extends React.Component {

  componentDidMount() {
      console.log(this.props, 'this.props')
      //const collection = this.props.match.params.id
    this.props.collectionCreator(jeansObject)
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

export default connect(mapStateToProps,{ collectionCreator }) (Collection)

