import React from 'react'
import { connect } from 'react-redux'
import { jeansPhoto } from '../FrontPage/FrontPageSale/FrontPageSale'
import {jeansCreator} from '../../Redux-reducers/contentReducer'
import PagesContent from '../contentToMap/PagesContent'

class Jeans extends React.Component {


componentDidMount(){
    this.props.jeansCreator(jeansPhoto)
}

   render(){
    return <PagesContent 
        elementsObject={this.props.elementsObject}
        filterType={'jeans'} 
        url={'/sale/saleJeans/'}/>
       }   
}
     
let mapStateToProps = (state) => { 
    return ({
        elementsObject: state.contentReducer.jeans, 
    })
}


export default connect(mapStateToProps,{jeansCreator }) (Jeans)

/**/

