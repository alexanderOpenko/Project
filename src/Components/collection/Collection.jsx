import React from 'react'
import { connect } from 'react-redux'
import { getCollectionAndFilterParams, collectionCreator } from '../../Redux-reducers/contentReducer'
import CollectionContent from './collectionContent'

class Collection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadedClass:  ''
        }

        this.preloader = React.createRef()
    }

    collectionRequest = () => {
        this.setState({
            isLoadedClass: ''
        }, () => { 
        const collectionPath = this.props.match.params.collection
        this.props.getCollectionAndFilterParams(collectionPath).then(
           () => this.setState({
            isLoadedClass: 'loaded '
        })
        )
    })   
    }

    componentDidMount() {;
        this.collectionRequest()
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.match.params.collection, this.props.match.params.collection);
        
        if (prevProps.match.params.collection !== this.props.match.params.collection) {
            this.collectionRequest()
        }
    }

    render() {
        return <div className={this.state.isLoadedClass + 'pageContent'}>
            <div className="preloader" ref={this.preloader}>
                <img src={require('../../Assets/Preloader.gif')} />
            </div>

            <CollectionContent
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
        parameters: state.contentReducer.collectionFilterParameters
    })
}

export default connect(mapStateToProps, { getCollectionAndFilterParams, collectionCreator })(Collection)

