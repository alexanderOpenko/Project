import React from 'react'
import { connect } from 'react-redux'
import { getCollectionAndFilterParams, collectionCreator } from '../../Redux-reducers/contentReducer'
import { setFilterStateAction, setFilterWarning } from '../../Redux-reducers/FilterContent'
import CollectionContent from './collectionContent'

class Collection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadedClass: ''
        }

        this.preloader = React.createRef()
        this.filterForm = React.createRef()
    }

    filterResetHandler = () => {
        this.filterForm.current.reset()
        this.collectionRequest()
        this.props.setFilterStateAction(false)
        if (this.props.noFilterResult) {
            this.props.setFilterWarning(false)
        }
    }

    collectionRequest = () => {
        window.scrollTo(0, 0)

        this.setState({
            isLoadedClass: ''
        }, () => {
            const collectionPath = this.props.match.params.collection

            this.props.getCollectionAndFilterParams(collectionPath).then(() => this.setState({
                isLoadedClass: 'loaded '
            })
            )
        })
    }

    componentDidMount() {
        this.collectionRequest()
        this.filterResetHandler()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.collection !== this.props.match.params.collection) {
            this.collectionRequest()
            this.filterResetHandler()
        }
    }

    render() {
        return <div className={this.state.isLoadedClass + 'pageContent'}>
            <div className="preloader" ref={this.preloader}>
                <img src={require('../../Assets/Preloader.gif')} />
            </div>

            <CollectionContent
                filterForm={this.filterForm}
                filterResetHandler={this.filterResetHandler}
                noFilterResult={this.props.noFilterResult}
                collectionRequest={this.collectionRequest}
                parameters={this.props.parameters}
                store={this.props.store}
                elementsObject={this.props.elementsObject}
                collectionPath={this.props.match.params.collection}
            />
        </div>
    }
}

const mapStateToProps = (state) => {
    return ({
        elementsObject: state.contentReducer.collectionContent,
        parameters: state.contentReducer.collectionFilterParameters,
        noFilterResult: state.filterReducer.noFilterResult
    })
}

export default connect(mapStateToProps, {
    getCollectionAndFilterParams,
    collectionCreator,
    setFilterStateAction,
    setFilterWarning
})
    (Collection)

