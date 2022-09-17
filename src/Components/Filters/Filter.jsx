import React from 'react'
import './filter.css'
import { filterContent } from '../../Redux-reducers/FilterContent'
import { connect } from 'react-redux'

class Filter extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.parameters, 'this.props.parameters');
  }

  toFilter = () => {
    const form = document.querySelector('#filter__form');
    const data = new FormData(form)
    const parsedFormData = {
      collectionPath: this.props.collectionPath,
      params: {}
    }

    for (const key of data.keys()) {
      const topics = data.getAll(key)
      parsedFormData.params[key] = topics
    }

    this.props.filterContent(parsedFormData)
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
          {this.props.parameters.map((el, i) => {
            return <div className='filter__parametersWrapper'
              key={i}
            >
              <h2 className='filter__optionsTitle'>
                {el.title}
              </h2>

              <div className={'filter__options filter__options-' + el.title}>
                {
                  el.options.map((opt, i) => {
                    return <label
                      key={i}
                      className={'filter__option filter__option-' + el.title}
                    >
                      <input
                        type='checkbox'
                        name={el.title}
                        className='hidden-input'
                        value={opt}
                      />

                      <span className={
                        el.title === 'color' ? 'color-option ' + opt
                          : el.title === 'size' ? 'filter-size-option'
                            : el.title === 'info' ? 'info-option'
                              : false
                      }>
                        {el.title !== 'color' ? opt : false}
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
          Apply
        </button>

        <button type='reset' className='filter__reset'>
          Reset
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


export default connect(mapStateToProps, { filterContent })(Filter);