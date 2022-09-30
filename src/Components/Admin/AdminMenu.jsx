import React from "react";
import {NavLink} from 'react-router-dom'

const AdminMenu = () => {
    return <div className='adminMenu'>
        <div><NavLink to='/products' className='adminMenu_item'>Products</NavLink></div>
        <div><NavLink to='/admin' className='adminMenu_item'>Collections</NavLink></div>
        <div><NavLink to='/admin' className='adminMenu_item'>Navigation</NavLink></div>
    </div>
}

export default AdminMenu