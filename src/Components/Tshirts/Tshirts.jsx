import React from 'react'
import { connect } from 'react-redux'
import PagesContent from '../contentToMap/PagesContent'
import {tshirtsCreator} from '../../Redux-reducers/contentReducer'

import image1 from '../../Pictures/New/img_01.jpg' 
import image2 from '../../Pictures/New/img_02.jpg'
import image3 from '../../Pictures/New/img_03.jpg'
import image0301 from '../../Pictures/New/img_0301.jpg'
import image4 from '../../Pictures/New/img_04.jpg'
import image0401 from '../../Pictures/New/img_0401.jpg'

export let tshirtPhoto = [
    { id: 131313,
        slidePhoto: image1,
        color:[ 'white'],
        price:[111],
        info: ['Біла футболка'], 
        size: ['S','M','L','XXL'] 
        },
    
    {id:54545,
    slidePhoto:image2,
     color: ['black'],
     price:[222],
        info: ['чорна футболка'], 
        size: ['XXS','M','L'] },
        
    {id:454545,
    slidePhoto:image3,
    urlPhoto1:image0301,
     price:[333],
     color: ['black'],
        info: ['чорна футболка'], 
        size: ['S','M','L','XL'] },
    
    {id:78877,
        slidePhoto:image4,
        urlPhoto1:image0401,
        color: ['yellow'],
     price:[555],
        info: ['жовта футболка'], 
        size: ['XS','S','M','L'] },
]


class Hoody extends React.Component {

componentDidMount(){
    this.props.tshirtsCreator(tshirtPhoto)
}

   render(){
    return <PagesContent 
        elementsObject={this.props.elementsObject}
        filterType={'tshirt'} 
        url={'/tshirt/'}/>
       }   
}
     
let mapStateToProps = (state) => { 
   return{ elementsObject: state.contentReducer.tshirts
}
}

export default connect(mapStateToProps,{ tshirtsCreator}) (Hoody)
