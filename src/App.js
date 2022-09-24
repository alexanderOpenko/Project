import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/header'
import Cart from "./Components/Cart/Cart"
import Footer from './Components/footer/footer'
import Collection from "./Components/collection/Collection"
import Admin from "./Components/Admin/Admin"
import Product from "./Components/Product/Product";
import FrontPage from './Components/FrontPage/FrontPage'
import { getCartItems } from './Redux-reducers/cartReducer'

class App extends React.Component {
    componentDidMount() {
        this.props.store.dispatch(getCartItems())
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

export default App
