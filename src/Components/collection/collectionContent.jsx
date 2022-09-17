import React from 'react'
import './PageContent.css'
import MapCollectionContent from './MapCollectionContent'
import Filter from "../Filters/Filter";

class CollectionContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showFilter: false,
        }
    }

    showFilter = () => {
        this.state.showFilter ? this.setState({ showFilter: false }) :
            this.setState({ showFilter: true })
    }

    render() {
        return <div className='pageContent'>

            <div data-content="content" className='content'>

                <button onClick={this.showFilter} className='btn'>
                    Фільтр
                </button>

                <MapCollectionContent
                    store={this.props.store}
                    elementsObject={this.props.elementsObject}
                    url={this.props.url}
                    collectionPath={this.props.collectionPath}
                />
            </div>

            <div className={!this.state.showFilter ? 'hidden' : ''}>
                <Filter
                    showFilter={this.showFilter}
                    filterType={this.props.filterType}
                    parameters={this.props.parameters}
                    collectionPath={this.props.collectionPath}
                />
            </div>
        </div>
    }
}

export default CollectionContent