import React from 'react'
import Filter from '../Filters/Filter'
import style from './PageContent.module.css'
import MapPageContentPhoto from './MapPageContentPhoto'

class PagesContent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showFilter: false,
    }
  }

  showFilter = () => {
    this.state.showFilter ? this.setState({showFilter: false}) :
      this.setState({showFilter: true})
  }

  render() {
    return <div className={style.pageContent}>

      <div data-content="content" className={style.content}>
          {
            (() => {
              if(this.props.filterType !== 'accessories') {
                return (
                    <button onClick={this.showFilter} className={style.btn}>
                      Фільтр
                    </button>
                )
              }
            })()
          }

        {
          typeof (this.props.elementsObject) == 'object' ?
          <MapPageContentPhoto //универсальная компонента чтобы аналогично строить страници
            elementsObject={this.props.elementsObject}
            url={this.props.url}
          />
          : <div className={style.filterError}>{this.props.elementsObject}</div>/*это строка, показывет что нет товара по фильтрам*/}
      </div>

      <div className={this.state.showFilter ? style.filter : style.filterDefault}>
        {this.props.filterType !== 'accessories' &&
        <Filter showFilter={this.showFilter} filterType={this.props.filterType}/>}
      </div>
    </div>
  }
}

export default PagesContent