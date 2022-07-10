import React from 'react'
import Filter from '../Filters/Filter'
import './PageContent.css'
import MapPageContent from './MapPageContent'

class CollectionContent extends React.Component {

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
        return <div className='pageContent'>

            <div data-content="content" className='content'>

                <button onClick={this.showFilter} className='btn'>
                    Фільтр
                </button>

                <MapPageContent
                    elementsObject={this.props.elementsObject}
                    url={this.props.url}
                />
            </div>

            {/*<div className={this.state.showFilter ? 'filter' : 'filterDefault'}>*/}
            {/*    {this.props.filterType !== 'accessories' &&*/}
            {/*    <Filter showFilter={this.showFilter} filterType={this.props.filterType}/>}*/}
            {/*</div>*/}
        </div>
    }
}

export default CollectionContent