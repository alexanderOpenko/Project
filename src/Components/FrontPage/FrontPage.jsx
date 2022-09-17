import React from 'react'
import s from './frontpage.module.css'
import image from '../../Assets/styleMan2.jpg'
import {NavLink, Redirect} from 'react-router-dom'
import FrontPageSale from './FrontPageSale/FrontPageSale'
import picture from '../../Assets/frontPageNew.jpg'


const FrontPage = () => {
  return (<>
    <div className={s.frontPagePosition}>
      <div className={s.news}>
        <img src={picture}/>
        <div className={s.newClothes}>
          <h1>Новинки</h1>
          <NavLink to='/new'>
            <button>Придбати</button>
          </NavLink>
        </div>
      </div>
      <FrontPageSale/>
    </div>
  </>)
}

export default FrontPage; 