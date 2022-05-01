import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import image from '../../Pictures/headerLogo.png'
import s from './header.module.css'
import basketPicture from '../../Pictures/shoppingCart.png'
import { connect } from 'react-redux'
import {showBasketAction, addElementToBasket,
  addElementBaskeSizeAction} from '../../Redux-reducers/basketReduser'
import { autofill } from 'redux-form'
import { useEffect } from 'react'
import Basket from './basket'
  

const Header = (props) => {
 
let setElementsBsket = () =>  {
 let lengthItems =  Number(localStorage.getItem('lengthItems'))
 props.addElementBaskeSizeAction(lengthItems)
}

  useEffect ( () => {
    //после того как страница отрендерится сработает юз ефект 
    //чтобы получить из localStorage даные которые несут значение длинны массива с объектами 
    //из корзины(количество товара). Когда число получено, оно диспатчится экшеном в стейт и страница заново
    //рендерится чтобы отобразилось актуальное количество товара в корзине.
    setElementsBsket()}, []
  )
  
  let showBasketPage = () => {   
  
    let bulean
    
    props.basket ? bulean = false : bulean = true
    props.showBasketAction(bulean)

    //экшн который запустит функцию которая получит объекты из IndexedDB 
    //и задиспатчит объекты в редакс стор и отобразит корзину
    props.addElementToBasket({showBasket: true})
  }
    
    return <>
      <div className={s.img}> 
        <NavLink to="/" >
          <img src = {image}/> 
       </NavLink>
      </div> 

      <span onClick={showBasketPage}>
         <img className={s.basket} src={basketPicture}/>
        {//если размер страници = число и > 0 то отобразится размер корзины
        (typeof(props.basketSize) == 'number' && props.basketSize > 0) ?
        <div className={s.basketSize}>
          {props.basketSize}
        </div>:''}
      </span>

        <span className = {s.bag}>
          {document.body.style.overflowY = `auto`}
        </span>
    
    
    {//если баскет true то отрисуется корзина
    props.basket && <Basket totalCount={props.totalCount} basketElements={props.basketElements}
    showBasketPage={showBasketPage}
    addElementToBasket={props.addElementToBasket}
   />}
</>
} 

let mapStateToProps = (state) => {
    return(
        {
         basket: state.basket.show,   
         basketElements: state.basket.basketElements,
         basketSize: state.basket.basketSize,
         totalCount: state.basket.totalCount
        }
    )
}

export default connect(mapStateToProps, {showBasketAction, addElementToBasket, addElementBaskeSizeAction}) (Header);