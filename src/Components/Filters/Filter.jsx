import React, { useState } from 'react'
import './filter.css'
import { filterContent, setFilterStateAction } from '../../Redux-reducers/FilterContent'
import { connect } from 'react-redux'

class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEnableFilter: false,
      formData: {}
    }

    this.filterForm = React.createRef()
  }

  resetFilter = () => {
    this.props.collectionRequest()
    this.props.setFilterStateAction(false)

    this.setState({
      isEnableFilter: false,
      formData: {}
    })
  }

  setEnableFilterStatus = () => {
    const form = this.filterForm.current
    const formData = new FormData(form)
    const data = []

    for (const key of formData) {
      data.push(key)
      break
    }

    if (data.length) {
      this.setState({
        isEnableFilter: true,
        formData: formData
      })
    } else {
      this.setState({
        isEnableFilter: false,
        formData: {}
      })
    }
  }

  toFilter = () => {
    if (!this.state.isEnableFilter) {
      return
    }

    const parsedFormData = {
      collectionPath: this.props.collectionPath,
      params: {}
    }

    for (const key of this.state.formData.keys()) {
      const values = this.state.formData.getAll(key)
      parsedFormData.params[key] = values
    }

    this.props.filterContent(parsedFormData)
  }

  render() {
    return <>
      <form className='filter' ref={this.filterForm} id='filter__form'>
        <div className='filter__head'>
          <span>Filter</span>

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

              <div className={'filter__options filter__options-' + el.title}
                onClick={() => setTimeout(this.setEnableFilterStatus, 100)}
              >
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
                      }
                      >
                        {el.title !== 'color' ? opt : false}
                      </span>
                        <div className="rotateArrow">
                        </div>
                        <div className="titleColor_info">
                          {opt}
                        </div>                     
                    </label>
                  })
                }
              </div>
            </div>
          })
          }
        </div>

        <button type='button' disabled={!this.state.isEnableFilter} className='filter__submit' onClick={this.toFilter}>
          Apply
        </button>

        <button type='reset' disabled={!this.props.isFiltered} className='filter__reset stripBtn'
          onClick={() => setTimeout(this.resetFilter, 0)}
        >
          Reset
        </button>
      </form>
    </>
  }
}

let mapStateToProps = (state) => {
  return ({
    isFiltered: state.filterReducer.isFiltered
  })
}


export default connect(mapStateToProps, { filterContent, setFilterStateAction })(Filter);