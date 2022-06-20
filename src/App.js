import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Index from './page/Index';
import Category from './page/Category';
import Singin from './page/Singin';
import Cart from './page/Cart';
import DetailProduct from './page/ProductDetail';
import Navbar from './component/Navbar';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import Footer from './component/Footer';
import Invoice from './page/Invoice';

function Content() {

  const {user} = useSelector(state => state.auth)
  
  const token = localStorage.getItem('token')
  console.log("appToken",token);

  useEffect (() => {
    const timer = parseFloat(localStorage.getItem('expire_in'))
    const Current = parseFloat(Date.now()/1000)
      if(Current >= timer){
        localStorage.removeItem('token')
        localStorage.removeItem('expire_in')
      }
    }, [])
  
  
  return (
    <React.Fragment>
        <Router>
          <Switch>
            <Route path="/" exact component={Index} basename="Index"/>
            <Route path="/product" exact component={Category} />
            <Route path="/product:slug" component={Category} />
            <Route path="/product/detail" exact component={DetailProduct} />
            <Route path="/product/detail/:slug" component={DetailProduct} />
            <Route path="/singin">
                {token ? <Redirect to="/"/> : <Singin />}
            </Route>
            <Route path="/cart" exact component={Cart} />
          </Switch>
        </Router>
    </React.Fragment>
  );
}


export default function App() {

  const {user} = useSelector(state => state.auth)
  
  const token = localStorage.getItem('token')
  console.log("appToken",token);

  useEffect (() => {
    const timer = parseFloat(localStorage.getItem('expire_in'))
    const Current = parseFloat(Date.now()/1000)
      if(Current >= timer){
        localStorage.removeItem('token')
        localStorage.removeItem('expire_in')
      }
    }, [])
  
  
  return (
    <React.Fragment>
      
      <Router>
        <Navbar/>
          <div className="w-100 mx-0 px-0 mb-5">
          <Switch>
            <Route path="/" exact component={Index} basename="Index"/>
            <Route path="/product" exact component={Category} />
            <Route path="/product:slug" component={Category} />
            <Route path="/product/detail" exact component={DetailProduct} />
            <Route path="/product/detail/:slug" component={DetailProduct} />
            <Route path="/singin">
                {token ? <Redirect to="/"/> : <Singin />}
            </Route>
            <Route path="/cart" exact component={Cart} />
            <Route path="/invoice" exact component={Invoice} />
          </Switch>
          </div>
          <footer className="mx-0 px-0 fixed-bottom">
                <Footer/>
          </footer>
        </Router>
      
    </React.Fragment>
  );
}

