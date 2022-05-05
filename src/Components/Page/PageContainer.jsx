import React from 'react'
import {connect} from 'react-redux'
import Page from './Page'
import {updatePhotoPageCreator} from '../../Redux-reducers/PageReducer'
import {addElementToBasket} from '../../Redux-reducers/basketReduser'
import {showBasketAction} from '../../Redux-reducers/basketReduser'

class PageContainer extends React.Component {

  componentDidMount() {
//в этом методе ЖЦ имитируется запрос на сервер
//в пропсах приходит масив this.props.photos и id элемента которого нужно отобразить
//экшн updatePhotoPageCreator диспатчит в стор этот масив
    console.log(this.props.match.params.id, 'this.props.match.params.id')
    this.props.updatePhotoPageCreator(this.props.photos[this.props.match.params.id])
  }

  render() {
    return (
      <Page
        photo={this.props.photo}
        params={this.props.match.params}
        addElement={this.props.addElementToBasket}
        basket={this.props.basket}
        showBasketAction={this.props.showBasketAction}
      />
    )
  }
}

let mapStateToProps = (state) => {
  return ({
    photo: state.PageReducer.page,//масив который задиспатчили в стор
    basket: state.basket.show //отображение корзины
  })
}

export default connect(mapStateToProps,
  {
    showBasketAction,
    updatePhotoPageCreator,
    addElementToBasket
  })
(PageContainer)