import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import $ from "jquery";
import Header from './Components/Header/header';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/footer/footer';
import Collection from "./Components/collection/Collection";
import {connect} from "react-redux";
import {routesCreator} from './Redux-reducers/navigationReducer';
import ProductCreate from "./Components/ProductCreate";

class App extends React.Component {
    componentDidMount() {
        document.body.style.cssText = `font-family: "Graphik Cond Web"; overflow-x: hidden`

        const promise1 = new Promise((resolve, reject) => $.ajax({
            type: "GET",
            url: "http://localhost:8888/store/collection.php",
            data: "collection",
            header: 'Content-Type: application/json',
            success (data) {
                resolve(data)
            },
        })
        )

        promise1.then((value) => {
           const data = JSON.parse(value);
           //this.props.routesCreator(data);
           console.log(data, 'data')
           // console.log(value, 'value')
        });
    }

    render() {
        return (
            <div className='wrapper-content'>

                <Header/>

                <div className='frontpage-content'>
                    <Navbar/>
                    <Switch>
                        {/*<Route exact path='/' render={() => <FrontPage/>}/>*/}

                        {/*<Route path={'/sale/saleJeans/:id'} render={(props) => (<PageContainer photos={jeansPhoto} {...props}/>)}/>*/}
                        {/*<Route path={'/newItems/:id'} render={(props) => (<PageContainer photos={newItemsPhoto} {...props}/>)}/>*/}
                        {/*<Route path={'/hoody/:id'} render={(props) => (<PageContainer photos={hoodyPhoto} {...props}/>)}/>*/}
                        {/*<Route path={'/tshirt/:id'} render={(props) => (<PageContainer photos={tshirtPhoto} {...props}/>)}/>*/}
                        {/*<Route path={'/clothes/:id'} render={(props) => (<PageContainer photos={clothesPhotoArray} {...props}/>)}/>*/}
                        {/*<Route path={'/Accessories/:id'} render={(props) => (<PageContainer photos={accessoriesPhoto} {...props}/>)}/>*/}

                        {
                            this.props.routes.map(el => {
                            return <Route path={"/" + el} render={(props) => <Collection {...props}/>}/>
                        })
                        }

                        <Route path={'/admin'} render={(props) => <ProductCreate {...props}/>}/>
                    </Switch>

                </div>
                <div className='footer'>
                    <Footer/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        routes: state.navigation.routes
    })
}

export default connect(mapStateToProps, {routesCreator})(App)
