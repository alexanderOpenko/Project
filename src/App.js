import React from 'react'
import {Route, Switch} from 'react-router-dom';
import './App.css';
import FrontPage from './Components/FrontPage/FrontPage';
import Header from './Components/Header/header';
import Navbar from './Components/Navbar/Navbar';
import News, {newItemsPhoto} from './Components/News/News';
import Jeans from './Components/Jeans/JeansContainer';
import Hoody, {hoodyPhoto} from './Components/Hoody/hoody';
import PageContainer from './Components/Page/PageContainer';
import Footer from './Components/footer/footer';
import {jeansPhoto} from './Components/FrontPage/FrontPageSale/FrontPageSale';
import Tshirts, {tshirtPhoto} from './Components/Tshirts/Tshirts';
import Clothes, {clothesPhotoArray} from './Components/clothes/clothes'
import Accessories, {accessoriesPhoto} from './Components/Accessories/Accessories'

const App = (props) => {
  document.body.style.cssText = `font-family: "Graphik Cond Web"; overflow-x: hidden`
  {
    return (

      <div className='wrapper-content'>

        <Header/>

        <div className='frontpage-content'>
          <Navbar/>
          <Switch>
            <Route exact path='/' render={() => <FrontPage/>}/>

            <Route path={'/sale/saleJeans/:id'} render={(props) => (<PageContainer photos={jeansPhoto} {...props}/>)}/>
            <Route path={'/newItems/:id'} render={(props) => (<PageContainer photos={newItemsPhoto} {...props}/>)}/>
            <Route path={'/hoody/:id'} render={(props) => (<PageContainer photos={hoodyPhoto} {...props}/>)}/>
            <Route path={'/tshirt/:id'} render={(props) => (<PageContainer photos={tshirtPhoto} {...props}/>)}/>
            <Route path={'/clothes/:id'} render={(props) => (<PageContainer photos={clothesPhotoArray} {...props}/>)}/>
            <Route path={'/Accessories/:id'}
                   render={(props) => (<PageContainer photos={accessoriesPhoto} {...props}/>)}/>
            <Route path='/jeans' render={() => <Jeans/>}/>
            <Route path='/clothes' render={() => <Clothes/>}/>
            <Route path='/new' render={() => <News/>}/>
            <Route path='/hoody' render={() => <Hoody/>}/>
            <Route path='/tshirt' render={() => <Tshirts/>}/>
            <Route path='/Accessories' render={() => <Accessories/>}/>
          </Switch>

        </div>
        <div className='footer'>
          <Footer/>
        </div>
      </div>
    )
  }
}
export default App;
