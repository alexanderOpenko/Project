import React from 'react'
import s from './Page.module.css'
import PageForm from './Pageform';
import {useEffect} from 'react'

const Page = (props) => {
  useEffect(() => {
      {
        window.scroll(0, 0)
      }
    }, []
  )

  let dataObject = props.photo //ссылка на объект фото из пропсов
  let size = []
  let photoPage = []

  //размеры для формы
  for (let s in dataObject.size) {
    size.push(dataObject.size[s])
  }

  //преобразовываю объект в масив
  for (let elem in dataObject) {
    let property = dataObject[elem]
    photoPage.push(property)
  }

  //с помощью метода фильтер я достаю из масива только строки
  let filteredPhotoPage = photoPage.filter(elem => {
    return typeof (elem) == 'string'
  })

  let show = (e) => {
    //создал независимый клон, копию объекта из пропсов
//если изменить объект из пропсов то перерисуется компонента
//в этот объект добавиться свойство buySize и объект отправится в корзину
    new Promise((resolve) => {
      let clone = Object.assign({}, dataObject)
      clone.buySize = e.size
      resolve(clone)
    }).then((data) => props.addElement({data})).then(() => {
      let bulean
      props.basket ? bulean = false : bulean = true
      props.showBasketAction(bulean)
    })
  }

  //получаю с помощью метода map все элементы с адресом изображений
  return (
    <div className={s.salePageContent}>
      <div className={s.saleBuy}>
        <div className={s.info}>
          <div className={s.name}>{dataObject.info}</div>
          <span className={s.price}>{dataObject.price} грн</span>
          <div className={s.line}></div>
          <span className={s.tableSize}>Таблиця розмірів</span>
          <PageForm onSubmit={show} size={size}/>
        </div>
      </div>
      <div className={s.salePicts}>  {filteredPhotoPage.map(p => {
        return <div className={s.image}>
          <img src={p}/>
        </div>
      })}
      </div>
    </div>)

}

export default Page;


