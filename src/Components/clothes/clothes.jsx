import React from 'react'
import {connect} from 'react-redux'
import PagesContent from '../contentToMap/PagesContent';
import { clothesCreator } from '../../Redux-reducers/contentReducer';
import { newItemsPhoto } from '../News/News';
import { jeansPhoto } from '../FrontPage/FrontPageSale/FrontPageSale';

import image1 from '../../Pictures/Sale/img_01.jpg' 
import image0101 from '../../Pictures/Sale/img_0101.jpg'    
import image0102 from '../../Pictures/Sale/img_0102.jpg'

import image2 from '../../Pictures/Sale/img_02.jpg'
import image0201 from '../../Pictures/Sale/img_0201.jpg'
import image0202 from '../../Pictures/Sale/img_0202.jpg'
import image0203 from '../../Pictures/Sale/img_0203.jpg'

import image3 from '../../Pictures/Sale/img_03.jpg'
import image0301 from '../../Pictures/Sale/img_0301.jpg'
import image0302 from '../../Pictures/Sale/img_0302.jpg'
import image0303 from '../../Pictures/Sale/img_0303.jpg'

import image4 from '../../Pictures/Sale/img_04.jpg'
import image0401 from '../../Pictures/Sale/img_0401.jpg'    
import image0402 from '../../Pictures/Sale/img_0402.jpg'

import image5 from '../../Pictures/Sale/img_05.jpg'
import image0501 from '../../Pictures/Sale/img_0501.jpg'
import image0502 from '../../Pictures/Sale/img_0502.jpg'
import image0503 from '../../Pictures/Sale/img_0503.jpg'

import image6 from '../../Pictures/Sale/img_06.jpg'
import image0601 from '../../Pictures/Sale/img_0601.jpg'
import image0602 from '../../Pictures/Sale/img_0602.jpg'

import image11 from '../../Pictures/New/img_01.jpg' 
import image22 from '../../Pictures/New/img_02.jpg'
import image33 from '../../Pictures/New/img_03.jpg'
import image03011 from '../../Pictures/New/img_0301.jpg'
import image44 from '../../Pictures/New/img_04.jpg'
import image04011 from '../../Pictures/New/img_0401.jpg'

import image55 from '../../Pictures/hoody/img_01.jpg' 
import image66 from '../../Pictures/hoody/img_02.jpg'
import image77 from '../../Pictures/hoody/img_03.jpg'
 
export let clothesPhotoArray = [

    { id: 1111,
        slidePhoto: image1,
        urlPhoto1:image0101,
        urlPhoto2:image0102,
        color:[ 'black'],
        price:[ 542],
        info: ['Прямі джинси'], 
        size: ['49','38','42'] 
        },
    
    {id:2222,
    slidePhoto:image2,
        urlPhoto1:image0201,
        urlPhoto2:image0202,
        urlPhoto3:image0203,
        color: ['silver'],
     price:[ 540],
        info: ['Базові джинси'], 
        size: ['36','38','42'] },
        
    
    {id:3333,
    slidePhoto:image3,
        urlPhoto1:image0301,
        urlPhoto2:image0302,
        urlPhoto3:image0303,
     price:[ 540],
     color: ['blue'],
        info: ['Базові джинси'], 
        size: ['36','38','42'] },
    
    {id:44444,
        slidePhoto:image4,
        urlPhoto1:image0401,
        urlPhoto2:image0402,
        color: ['#39d1ff'],       
        price:[532],
        info: ['Базові джинси'], 
        size: ['36','38','42'] },
                
    {id:55555,
        slidePhoto:image5,
        urlPhoto1:image0501,
        urlPhoto2:image0502,
        urlPhoto3:image0503,
        color: ['black'],
     price:[544],
        info: ['Широкі джинси'], 
        size: ['36','38','42'] },
        
    
    {id:67777,
        slidePhoto:image6,
        urlPhoto1:image0601,
        urlPhoto2:image0602,
        color: ['blue'],
     price:[545],
        info: ['Широкі джинси'], 
        size: ['36','38','42'] },

        { id: 131313,
            slidePhoto: image11,
            color:[ 'white'],
            price:[111],
            info: ['Біла футболка'], 
            size: ['S','M','L','XXL'] 
            },
        
        {id:54545,
        slidePhoto:image22,
         color: ['black'],
         price:[222],
            info: ['чорна футболка'], 
            size: ['XXS','M','L'] },
            
        {id:454545,
        slidePhoto:image33,
        urlPhoto1:image03011,
         price:[333],
         color: ['black'],
            info: ['чорна футболка'], 
            size: ['S','M','L','XL'] },
        
        {id:78877,
            slidePhoto:image44,
            urlPhoto1:image04011,
            color: ['yellow'],
         price:[555],
            info: ['жовта футболка'], 
            size: ['XS','S','M','L'] },

            {id:155236,
                slidePhoto:image55,
                color: ["black"],
                price:[777],
                info: ['Black hoody'], 
                size: ['XXS','M','L'] },
        
            {id:32342,
                slidePhoto:image66,
                 price:[888],
                 color: ["red"],
                    info: ['Red hoody'], 
                    size: ['S','M','L','XL'] },
        
                            
                {id:225566,
                    slidePhoto:image77,
                    color: ['black'],
                 price:[878],
                    info: ['Black hoody'], 
                    size: ['XS','S','M','L'] },    
]

class Clothes extends React.Component {

    componentDidMount() {
        let num = []
         new Promise ( (resolve, reject) => {
            let clothesPhoto = num.concat(jeansPhoto, newItemsPhoto)
            resolve(clothesPhoto);
        }).then( data => {this.props.clothesCreator(data)})
        } 

        render(){
            return <PagesContent
            elementsObject={this.props.elementsObject}
            filterType={'clothes'} 
            url={'/clothes/'}
            />
        }
    }
    
    let mapStateToProps = (state) => { 
    
        return ({
            elementsObject: state.contentReducer.clothes, 
        })
    }
    
    
    export default connect(mapStateToProps,{clothesCreator }) (Clothes)