import React from 'react'
import { connect } from 'react-redux'
import PagesContent from '../contentToMap/PagesContent'
import {hoodyCreator} from '../../Redux-reducers/contentReducer'

import image5 from '../../Pictures/hoody/img_01.jpg' 
import image6 from '../../Pictures/hoody/img_02.jpg'
import image7 from '../../Pictures/hoody/img_03.jpg'  

export let hoodyPhoto = [
   
        {id:32342,
        slidePhoto:image6,
         price:[888],
         color: ["red"],
            info: ['Red hoody'], 
            size: ['S','M','L','XL'] },

        {id:155236,
        slidePhoto:image5,
        color: ["black"],
        price:[777],
        info: ['Black hoody'], 
        size: ['XXS','M','L'] },
                    
        {id:225566,
            slidePhoto:image7,
            color: ['black'],
         price:[878],
            info: ['Black hoody'], 
            size: ['XS','S','M','L'] },
    
]


class Hoody extends React.Component {

componentDidMount(){
    this.props.hoodyCreator(hoodyPhoto)
}

   render(){
    return <PagesContent 
        elementsObject={this.props.elementsObject}
        filterType={'hoody'} 
        url={'/hoody/'}/>
       }   
}
     
let mapStateToProps = (state) => { 
   return{ elementsObject: state.contentReducer.hoody
}
}

export default connect(mapStateToProps,{ hoodyCreator}) (Hoody)



