import React from 'react'
import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import s from './menu.module.css'

const Menu = (props) => {

    let [clothesList, setCL] = useState(false)

    const menuAppear = () => {
        props.menuAppear(true)
    }

    const showMenu = () => {
        clothesList ? setCL(false) : setCL(true)
    }


    return <div onMouseLeave={menuAppear}>
        <span className={s.close} onClick={menuAppear}>&#10006;</span>
        <div className={s.menu}>
            <div className={s.baseList}>
                <ul>
                    <li className={s.active} onClick={showMenu}>одяг</li>
                    <li onClick={menuAppear}><NavLink to='/admin' className={s.active}>admin</NavLink></li>
                    <li onClick={menuAppear}><NavLink to={'/new'} className={s.active}>новинки</NavLink></li>/collection/t-shirt
                    <li onClick={menuAppear}><NavLink to='/Accessories' className={s.active}>аксесуари</NavLink></li>
                    <li onClick={menuAppear}><NavLink to='/collection/t-shirt' className={s.active}>t-shirt</NavLink></li>
                </ul>
            </div>
            {clothesList && <div className={s.clothesList}>
                <ul>
                    <li onClick={menuAppear}><NavLink to='/jeans' className={s.active}>джинси</NavLink></li>
                    <li onClick={menuAppear}><NavLink to='/hoody' className={s.active}>толстовки</NavLink></li>
                    <li onClick={menuAppear}><NavLink to='/tshirt' className={s.active}>футболки</NavLink></li>
                </ul>
            </div>}
        </div>

    </div>
}

export default Menu;