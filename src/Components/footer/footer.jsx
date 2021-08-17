import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './footer.module.css'

const Footer = () => {
    return<>
    <div className = {s.footerBody}>
        <div>
            <div className={s.footerHeaders}>Меню</div>   
    <ul > 
        <li ><NavLink to='/clothes' className={s.active}>одяг</NavLink></li>
        <li ><NavLink to='/new' className={s.active}>новинки</NavLink></li>
        <li ><NavLink to='/accessories' className={s.active}>аксесуари</NavLink></li>
    </ul>
        </div>
        <div>
        <div className={s.footerHeaders}>Підтримка</div>
            <div><p>Cлужба підтримки</p></div>
            <div><p>Контакти</p></div>
            <div><p>Повернення</p></div>
        </div>
        <div>
        <div className={s.footerHeaders}>Соцмережі</div>
            <div><p>Facebook</p></div>
            <div><p>Twitter</p></div>
            <div><p>Instagram</p></div>
            <div><p>Pinterest</p></div>
        </div>
        <div>
        <div className={s.footerHeaders}>Про нас</div>
            <div><p>Про компанію</p></div>
            <div><p>Гарантії</p></div>
        </div>
    </div>
     <div className={s.footerFooter}>
         
    </div>
     </>
}

export default Footer