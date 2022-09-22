import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/header'
import Cart from "./Components/Cart/Cart"
import Footer from './Components/footer/footer'
import Collection from "./Components/collection/Collection"
import { connect } from "react-redux"
import { routesCreator } from './Redux-reducers/navigationReducer'
import { updateCartItemsAction, updateCartItemsTotalPriceAction } from './Redux-reducers/cartReduser'
import Admin from "./Components/Admin/Admin"
import request from "./API/api";
import Product from "./Components/Product/Product";
import FrontPage from './Components/FrontPage/FrontPage'

class App extends React.Component {
    componentDidMount() {
        request({ path: 'cart', method: 'GET' })
            .then((data) => {
                if (data.code !== 0) {
                    this.props.store.dispatch(updateCartItemsAction(data.body.cart_items))
                    this.props.store.dispatch(updateCartItemsTotalPriceAction(data.body.total_price))
                }
            })
    }

    render() {
        return (
            <div className='wrapper-content'>
                <Header store={this.props.store} />
                <Cart />

                <Switch>
                    <Route exact path='/' render={() => <FrontPage />} />

                    <Route path={'/collection/:collection/:id'} render={(props) => <Product store={this.props.store} {...props} />} />
                    <Route path={'/collection/:collection'} render={(props) => <Collection store={this.props.store} {...props} />} />

                    <Route path={'/admin'} render={(props) => <Admin {...props} />} />
                </Switch>

                <div className='footer'>
                    <Footer />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        routes: state.navigation.routes
    })
}

export default connect(mapStateToProps, { routesCreator, updateCartItemsAction })(App)
