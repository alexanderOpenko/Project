import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './MapPageContentPhoto.module.css'

const MapPageContentPhoto = (props) => {
return<>
{props.elementsObject.map(elem =>{ 
    return <div  className ={style.saleElement}>
      <NavLink to={props.url + Number(props.elementsObject.indexOf(elem)+1)}>
    <img src={elem.slidePhoto}/> 
    <div>
        <span className={style.saleContentInfo}>{elem.info}</span> 
        <br/>
        <span className={style.saleContentPrice}>{elem.price} </span>грн 
    </div>
    </NavLink>
    </div>
    })}
</>
}

export default MapPageContentPhoto