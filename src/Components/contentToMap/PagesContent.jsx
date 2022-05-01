import React from 'react'
import Filter from '../Filters/Filter'
import ReactDom from 'react-dom'
import style from './PageContent.module.css'
import MapPageContentPhoto from './MapPageContentPhoto'

class PagesContent extends React.Component {

  constructor(props) {
    super(props)
    this.content = React.createRef();
    this.button = React.createRef();
    this.state = {
      showFilter: false,
      margin: 14,
      visibleElements: 4,
    }
  }

  contentStyle = () => {
    this.content = this.content.current
    this.elements = this.content.childNodes
    this.widthContent = this.content.offsetWidth
    this.button = this.button.current
    this.setStyle()
  }

  componentDidMount() {
    this.contentStyle()
  }

  componentDidUpdate(prevState, prevProps) {
    this.contentStyle()
  }

  setStyle = () => {
    if (this.widthContent < 800) {
      this.state.visibleElements === 2 || this.setState({
        visibleElements: 2
      })
    }
    let widthElem = (this.widthContent - this.state.margin * this.state.visibleElements) /
      this.state.visibleElements
    for (let e of this.elements) {
      e.style.cssText = ` width:${widthElem - 30}px; margin-right:${this.state.margin}px;`
    }
    let buttonWidth = (widthElem * this.state.visibleElements) + (this.state.margin * (this.state.visibleElements - 1))
    this.button.style.cssText = ` max-width:${buttonWidth - 30 * this.state.visibleElements}px`

  }

  showFilter = () => {
    this.state.showFilter ? this.setState({showFilter: false}) :
      this.setState({showFilter: true})
  }

  render() {
    return <div className={style.pageContent}>

      <div ref={this.content} className={style.content}>

        {<div ref={this.button} className={style.button}>
          {this.props.filterType !== 'accessories' && <button onClick={this.showFilter} className={style.btn}>
            Фільтр
          </button>}
        </div>}

        {typeof (this.props.elementsObject) == 'object' ?

          <MapPageContentPhoto //универсальная компонента чтобы аналогично строить страници
            elementsObject={this.props.elementsObject}
            url={this.props.url}
          />

          : <div
            className={style.filterError}>{this.props.elementsObject}</div>/*это строка, показывет что нет товара по фильтрам*/}

      </div>

      <div className={this.state.showFilter ? style.filter : style.filterDefault}>
        {this.props.filterType !== 'accessories' &&
        <Filter showFilter={this.showFilter} filterType={this.props.filterType}/>}
      </div>
    </div>
  }
}


export default PagesContent