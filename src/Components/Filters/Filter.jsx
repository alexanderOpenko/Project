import React from 'react'
import ReactDom from 'react-dom'
import './filter.css'
import {filterContent} from '../../Redux-reducers/FilterContent'
import {connect} from 'react-redux'

class Filter extends React.Component {

  constructor(props) {
    super(props)

    this.parameters = [
      {title: 'color', options: ['white-blue', 'blue', 'black', 'yellow', 'silver', 'red', 'white']},
      {title: 'size', options: [8, 32, 36, 38, 42, 46, 49, 54, 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']},
      {title: 'info', options: ['Basic', 'Straight', 'Wide', 'Narrow', 'Vintage']}
    ]
  }

  toFilter = () => {
    const form = document.querySelector('#filter__form');
    const data = new FormData(form);

    const formData = {
      filterType: this.props.filterType
    };

    for (let [key, value] of data) {
      formData[key] = value;
    }

    this.props.filterContent(formData)
    this.props.showFilter()
  }

  render() {
    return <>
      <form className='filter' id='filter__form'>
        <div className='filter__head'>
          <span>Фільтр</span>

          <span onClick={this.props.showFilter} className='close'>
              &#10006;
            </span>
        </div>

        <div className='filter__parameters'>
          {this.parameters.map(el => {
            return <div className='filter__parametersWrapper'>
              <h2 className='filter__optionsTitle'>
                {el.title}
              </h2>

              <div className={'filter__options filter__options-' + el.title}>
                {
                  el.options.map(opt => {
                    return <label
                      className={'filter__option filter__option-' + el.title}
                    >
                      <input
                        type='radio'
                        name={el.title}
                        className='hidden-input'
                        value={opt}
                      />

                      <span className={
                          el.title === 'color' ? 'color-option ' + opt
                          : el.title === 'size' ? 'size-option'
                          : el.title === 'info' ? 'info-option'
                          : false
                      }>
                        { el.title !== 'color' ? opt : false }
                      </span>
                    </label>
                  })
                }
              </div>
            </div>
          })
          }
        </div>

        <button type='button' className='filter__submit' onClick={this.toFilter}>
          Переглянути
        </button>

        <button type='reset' className='filter__submit'>
          reset
        </button>
      </form>
    </>
  }
}

let mapStateToProps = (state) => {
  return (
    {}
  )
}


export default connect(mapStateToProps, {filterContent})(Filter);