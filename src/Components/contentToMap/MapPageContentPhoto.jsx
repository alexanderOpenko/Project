import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './MapPageContentPhoto.module.css'

const MapPageContentPhoto = (props) => {
  return <>
    <div className={s.collection}>
    {props.elementsObject.map(elem => {
      return <div className={s.saleElement} data-element='sale-element'>
        <NavLink to={props.url + Number(props.elementsObject.indexOf(elem))}>
          <img src={elem.mainPhoto}/>

          <div>
            <span className={s.saleContentInfo}>{elem.info}</span>
            <br/>
            <span className={s.saleContentPrice}>{elem.price} </span>грн
          </div>
        </NavLink>
      </div>
    })}
    </div>
  </>
}

export default MapPageContentPhoto