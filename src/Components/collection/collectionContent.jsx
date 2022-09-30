import React from 'react'
import './PageContent.css'
import MapCollectionContent from './MapCollectionContent'
import Filter from "../Filters/Filter"
import { connect } from 'react-redux'

class CollectionContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEnableFilterBtn: false,
            formData: {},
            showFilter: false,
        }
    }

    resetFilter = () => {
        this.props.filterResetHandler()
     
         this.setState({
           isEnableFilterBtn: false,
           formData: {}
         })
     
         this.showFilter()
       }
     
    setEnableFilterBtnStatus = () => {
         const form = this.props.filterForm.current
         const formData = new FormData(form)
         const data = []
     
         for (const key of formData) {
           data.push(key)
           break
         }
     
         if (data.length) {
           this.setState({
             isEnableFilterBtn: true,
             formData: formData
           })
         } else {
           this.setState({
             isEnableFilterBtn: false,
             formData: {}
           })
         }
    }

    showFilter = () => {
        this.state.showFilter ? this.setState({ showFilter: false }) : this.setState({ showFilter: true })
    }

    render() {
        return <>
            <div data-content="content" className='collection_content'>
                <div className={'filter_managers'}>
                    <button onClick={this.showFilter} 
                            className={'filter_btn btn' + (this.props.isFiltered ? ' filter_btn--active' : '')}>
                        Filter
                    </button>

                    {this.props.isFiltered &&
                        <button className='filter_reset-btn stripBtn'
                            onClick={this.props.filterResetHandler}
                        >
                            reset
                        </button>
                    }
                </div>

                {this.props.noFilterResult &&
                <div className='collection_no-filter-results'>
                    <img src={require('../../Assets/no-result-found.png')} />
                    <h3>No result found by filter options</h3>
                </div>
                }

                <MapCollectionContent
                    store={this.props.store}
                    elementsObject={this.props.elementsObject}
                    url={this.props.url}
                    collectionPath={this.props.collectionPath}
                />
            </div>

            <div className={!this.state.showFilter ? 'collectio_filter hidden' : 'collectio_filter'}>
                <Filter
                    filterForm={this.props.filterForm}
                    isFiltered={this.props.isFiltered}
                    isEnableFilterBtn={this.state.isEnableFilterBtn}
                    formData={this.state.formData}
                    filterResetHandler={this.filterResetHandler}
                    collectionRequest={this.props.collectionRequest}
                    showFilter={this.showFilter}
                    parameters={this.props.parameters}
                    collectionPath={this.props.collectionPath}
                    resetFilter={this.resetFilter}
                    setEnableFilterBtnStatus={this.setEnableFilterBtnStatus}
                />
            </div>
        </>
    }
}

const mapStateToProps = (state) => {
    return ({
        isFiltered: state.filterReducer.isFiltered,
    })
}


export default connect(mapStateToProps)(CollectionContent);