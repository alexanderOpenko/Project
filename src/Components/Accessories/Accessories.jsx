import React from 'react'
import { connect } from 'react-redux'
import PagesContent from '../contentToMap/PagesContent'
import {accessoriesCreator} from '../../Redux-reducers/contentReducer'

import image1 from '../../Pictures/winterGirl.jpg' 
import image2 from '../../Pictures/winter.jpg'

export let accessoriesPhoto = [  
        {id:82342,
        slidePhoto:image1,
         price:[1],
         size: ['A4','A3','A2'], 
         info: ['Human at Winter']},
        

        {id:165236,
        slidePhoto:image2,
        price:[1],
        size: ['A4','A3','A2'],
        info: ['Winter'] },        
]

class Accessories extends React.Component {

componentDidMount(){
    this.props.accessoriesCreator(accessoriesPhoto)
}

   render(){
    return <PagesContent 
        elementsObject={this.props.elementsObject}
        filterType={'accessories'} 
        url={'/accessories/'}/>
       }   
}
     
let mapStateToProps = (state) => { 
   return{ elementsObject: state.contentReducer.Accessories
}
}

export default connect(mapStateToProps,{ accessoriesCreator}) (Accessories)