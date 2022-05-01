import React from 'react'
import PagesContent from '../contentToMap/PagesContent';
import {newItemsCreator} from '../../Redux-reducers/contentReducer'
import { connect } from 'react-redux'

import image1 from '../../Pictures/New/img_01.jpg' 
import image2 from '../../Pictures/New/img_02.jpg'
import image3 from '../../Pictures/New/img_03.jpg'
import image0301 from '../../Pictures/New/img_0301.jpg'
import image4 from '../../Pictures/New/img_04.jpg'
import image0401 from '../../Pictures/New/img_0401.jpg' 
import image5 from '../../Pictures/hoody/img_01.jpg' 
import image6 from '../../Pictures/hoody/img_02.jpg'
import image7 from '../../Pictures/hoody/img_03.jpg'   


export let newItemsPhoto = [
    { id: 1,
        slidePhoto: image1,
        color:[ 'white'],
        price:[111],
        info: ['Біла футболка'], 
        size: ['S','M','L','XXL'] 
        },
    
    {id:2,
    slidePhoto:image2,
     color: ['black'],
     price:[222],
        info: ['чорна футболка'], 
        size: ['XXS','M','L'] },
        
    {id:3,
    slidePhoto:image3,
    urlPhoto1:image0301,
     price:[333],
     color: ['black'],
        info: ['чорна футболка'], 
        size: ['S','M','L','XL'] },
    
    {id:4,
        slidePhoto:image4,
        urlPhoto1:image0401,
        color: ['yellow'],
     price:[555],
        info: ['жовта футболка'], 
        size: ['XS','S','M','L'] },
    
        {id:5,
            slidePhoto:image5,
             color: ['black'],
             price:[777],
                info: ['Black hoody'], 
                size: ['XXS','M','L'] },
                
            {id:6,
            slidePhoto:image6,
             price:[888],
             color: ['Red'],
                info: ['Red hoody'], 
                size: ['S','M','L','XL'] },
            
            {id:7,
                slidePhoto:image7,
                color: ['Black'],
             price:[88.88],
                info: ['Black hoody'], 
                size: ['XS','S','M','L'] },
        
]

class News extends React.Component {
   
componentDidMount(){
    this.props.newItemsCreator(newItemsPhoto)
    }

    render(){
        return <PagesContent
        elementsObject={this.props.elementsObject}
        filterType={'new'} 
        url={'/newItems/'}
        />
    }
}

let mapStateToProps = (state) => { 

    return ({
        elementsObject: state.contentReducer.newItems, 
    })
}


export default connect(mapStateToProps,{newItemsCreator }) (News)
