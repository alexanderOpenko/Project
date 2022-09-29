import React from 'react'
import './filter.css'
import { filterContent } from '../../Redux-reducers/FilterContent'
import { connect } from 'react-redux'

class Filter extends React.Component {
  toFilter = () => {
    if (!this.props.isEnableFilterBtn) {
      return
    }

    const parsedFormData = {
      collectionPath: this.props.collectionPath,
      params: {}
    }

    for (const key of this.props.formData.keys()) {
      const values = this.props.formData.getAll(key)
      parsedFormData.params[key] = values
    }

    this.props.filterContent(parsedFormData)
    this.props.showFilter()
  }

  render() {
    return <>
      <form className='filter' ref={this.props.filterForm} id='filter__form'>
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
                onClick={() => setTimeout(this.props.setEnableFilterBtnStatus, 100)}
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

        <button type='button' disabled={!this.props.isEnableFilterBtn} className='filter__submit' onClick={this.toFilter}>
          Apply
        </button>

        <button type='reset' disabled={!this.props.isFiltered} className='filter__reset stripBtn'
          onClick={() => setTimeout(this.props.resetFilter, 0)}
        >
          Reset
        </button>
      </form>
    </>
  }
}

const mapStateToProps = () => {
  return ({})
}

export default connect(mapStateToProps, { filterContent })(Filter);