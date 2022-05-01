import React from 'react'
import ReactDom from 'react-dom'
import style from './filter.module.css'
import {filterContent} from '../../Redux-reducers/FilterContent'
import { connect } from 'react-redux'

class Filter extends React.Component {

constructor(props){
    super(props)
    this.saleSize = React.createRef()
    this.saleColor = React.createRef()
    this.saleInfo = React.createRef()
    this.state = {
        color: [], 
        size: [],
        info: []  
    }
}

filter = () => {
    this.saleSize = this.saleSize.current
    this.elementsSize = this.saleSize.childNodes
    this.saleColor = this.saleColor.current
    this.elementsSaleColor =  this.saleColor.childNodes
    if(this.props.filterType === 'jeans' || this.props.filterType === 'clothes') (this.saleInfo = this.saleInfo.current)
    if(this.props.filterType === 'jeans' || this.props.filterType === 'clothes') (this.elementsSaleInfo =  this.saleInfo.childNodes)
}

componentDidMount(){
    this.filter()
}

componentDidUpdate(){
    this.filter()
}

createSaleFilterObj = (propertys) => {
    if(propertys.color) {
      this.state.color !== propertys.color ?
       this.setState({
      color:  propertys.color
     }) : this.setState({
        color:  undefined
       })  //чтобы отменить параметр фильтра на активном элементе

    }else if(propertys.size) {
    this.state.size !== propertys.size ?
     this.setState({
            size: propertys.size,
         }) : this.setState({
            size:  undefined
           }) //чтобы отменить параметр фильтра на активном элементе
    }else if(propertys.info){
    this.state.info !== propertys.info ?
    this.setState({
        info: propertys.info,
     }) 
     : this.setState({
        info: undefined
     })
    } 
   
   //затираю рамочки
   //this.elementsSaleColor = псевдомасив c дочерями и сыновьями елемента которого я достаю из ДОМ используя ref
   if(propertys.color)this.elementsSaleColor.forEach(el => {return el.firstChild.style.cssText = `border: 2px solid rgb(212, 212, 212)`})
    if(propertys.size)this.elementsSize.forEach(el => {return el.style.cssText = `border-color: color`})
   if(propertys.info)this.elementsSaleInfo.forEach(el => {return el.style.cssText =`background-color: transparent; color: auto`})
   //выделяю рамочкою каждый выбраный елемент 
    //если значение параметра совпадает с значением в стейт то снимаю стили 
    //чтобы снять стили выбраного элемента если нужно 
   if(propertys.color)propertys.color !== this.state.color ? 
   this.elementsSaleColor[propertys.ind-1].firstChild.style.cssText = `border: 2px solid orange; opacity: 0.5`
   :
   this.elementsSaleColor.forEach(el => {return el.firstChild.style.cssText = `border: 2px solid rgb(212, 212, 212)`} )

   if(propertys.size)propertys.size !== this.state.size ? this.elementsSize[propertys.ind-1].style.cssText = `border: 1px solid orange`
  : 
  this.elementsSize.forEach(el => {return el.style.cssText = `border-color: auto`})

   if(propertys.info)propertys.info !== this.state.info ? this.elementsSaleInfo[propertys.ind-1].style.cssText =`background-color: black; color: white`
   : 
   this.elementsSaleInfo.forEach(el => {return el.style.cssText =`background-color: transparent; color: auto`})
}

toFilter = () => {
    this.props.filterContent(
        {color:this.state.color, 
        size:this.state.size, 
        info:this.state.info,
        filterType: this.props.filterType})
    this.props.showFilter()
}

    render() {
        return <>
        <div  className={style.filterHead}><span>Фільтр</span>  
        <span onClick={this.props.showFilter}className={style.close}>&#10006;</span></div>
    
        <div className={style.filterContainers}>
    
        <div  className={style.colorFilterSale}>
        <span className={style.headerSale}>Кольори</span>
        <div ref={this.saleColor}>
        <button onClick={() => this.createSaleFilterObj(this.color = { color:'whiteblue', ind:1})}><span className={style.whiteblue} ></span><span>голубий</span></button>
 <button onClick={() => this.createSaleFilterObj(this.color = { color:'blue', ind:2})}><span className={style.blue} ></span><span>синій</span></button>
 <button onClick={() => this.createSaleFilterObj(this.color = { color:'black', ind:3})}><span className={style.black} ></span><span>чорний</span></button>
 <button  onClick={() => this.createSaleFilterObj(this.color = { color:'yellow', ind:4})}><span className={style.khaki} ></span><span>жовтий</span></button>
 <button  onClick={() => this.createSaleFilterObj(this.color = { color:'silver', ind:5})}><span className={style.silver} ></span><span>сірий</span></button>
 <button  onClick={() => this.createSaleFilterObj(this.color = { color:'red', ind:6})}><span className={style.red} ></span><span>червоний</span></button>
 <button  onClick={() => this.createSaleFilterObj(this.color = { color:'white', ind:7})}><span className={style.white} ></span><span>білий</span></button>
       </div>
        </div>
    
        <div className={style.sizeFilterSale}>
            <span className={style.headerSale}>Розміри</span>
            <div ref={this.saleSize}>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'32', ind:1 })}>32</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'36', ind:2 })}>36</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'38', ind:3 })}>38</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'42', ind:4 })}>42</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'46', ind:5 })}>46</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'49', ind:6 })}>49</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'XXS', ind:7 })}>XXS</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'XS', ind:8 })}>XS</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'S', ind:9 })}>S</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'M', ind:10 })}>M</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'L', ind:11 })}>L</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'XL', ind:12 })}>XL</button>
            <button onClick={() => this.createSaleFilterObj(this.size = { size:'XXL', ind:13 })}>XXL</button>
            </div>
        </div>
    
       {(this.props.filterType === 'jeans' || this.props.filterType === 'clothes') && <div className={style.infoFilterSale}>
        <span className={style.headerSale}>Характеристики</span>
            <div ref={this.saleInfo}>
            <button onClick={() => this.createSaleFilterObj(this.info = { info:'Базові джинси', ind:1 })}>Базові джинси</button>
            <button onClick={() => this.createSaleFilterObj(this.info = { info:'Прямі джинси', ind:2 })}>Прямі джинси</button>
            <button onClick={() => this.createSaleFilterObj(this.info = { info:'Широкі джинси', ind:3 })}>Широкі джинси</button>
            <button onClick={() => this.createSaleFilterObj(this.info = { info:'Вузькі джинси', ind:4 })}>Вузькі джинси</button>
            <button onClick={() => this.createSaleFilterObj(this.info = { info:'Вінтажні джинси', ind:5 })}>Вінтажні джинси</button>
        </div>
        </div>}
        <span className={style.toFilter}>
            <button  onClick={this.toFilter}>Переглянути</button>
        </span>
        </div>
        </>
    }
}

let mapStateToProps = (state) => {
    return(
        {
        
        }
    )
}


export default connect(mapStateToProps, {filterContent}) (Filter);