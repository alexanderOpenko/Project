import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter} from 'react-router-dom';
import store from './Redux-reducers/Redux'
import {Provider} from "react-redux"

/*let EntireTree  = () => {*/
ReactDOM.render(
  <HashRouter>  
      <Provider store={store}>
            <App store={store}/>  
      </Provider>
    </HashRouter>,
  document.getElementById('root')
);
//}

//EntireTree()

//store.subscribe( () => {
  // EntireTree()rggr
//});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

