import React from 'react'
import s from './header.module.css'

const Basket = (props) => {
    return <div className = {s.BasketPage}>
      
   <span className = {s.bag}>{document.body.style.overflowY = `hidden`}</span>
  
   <div className={s.basketContent}>

   <div  className={s.basketHeader}><span>Кошик</span>  
    <span onClick={props.showBasketPage} className={s.basketClose}>&#10006;</span></div>

    <div className = {s.basketImg}> {props.basketElements.map( el =>{
      return <div >
      <div><img src={el.slidePhoto}/> <span>
     <span style={{fontWeight: '800', width: '200px'}} >
          {el.info }
        </span> <br/>
        <span style={{fontWeight: '200px', width: '200px', fontSize: 13}} >
         код товара: {el.id }
        </span>
        <span onClick={() => //удалить элемент 
        {props.addElementToBasket({
          deleteElem: {elem:el.keys, deletePrice:el.price}})}} 
          style={{marginLeft: '180px', cursor: 'pointer'}}>
            &#10006;
        </span>
        <br/> 
      <span //отображаю цвет
      style={{
        width: '52px', 
        border: '1px solid black', 
        padding: '9px 8px 15px 8px',
        marginTop: '10px'}} >
          <span style={{
            width: 52 +'px', 
          height:7 +'px', 
          backgroundColor:el.color}} />
          </span>
          <span //размер
          style={{
            border: '1px solid black',
           padding: '4px 20px 4px 20px',
           fontSize: '12px',
           marginLeft: '85px', 
           marginTop: '10px'}} >{el.buySize}</span>
           <span //цена
           style={{
            width: '50px',
           fontSize: '15px',
           fontWeight: 550,
           marginLeft: '180px', 
           marginTop: '19px'}}>
             {Number(el.price)} грн</span>
          </span> 
           </div>
    </div>})} 
    </div>
    <div style={{
            width: '150px',
           fontSize: '15px',
           fontWeight: 900,
           marginLeft: '250px',
           marginTop: '40px' 
           }}>всього: {props.totalCount} грн</div>
    <div className={s.toBuy}>
        <button>Оформити замовлення</button>
        <button onClick={props.showBasketPage}>Продовжити покупку</button>
    </div>
    </div>
    </div>}

export default Basket