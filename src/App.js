import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Page404 from './components/Page404';
import About from './components/About';
import Contacts from './components/Contacts';
import Catalog from './components/Catalog';
import ItemCard from './components/ItemCard';
import Cart from './components/Cart';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from './actions/actionCreators';


export default function App() {
  const dispatch = useDispatch();
  
  const items = localStorage.getItem('bosa-noga-cart');
  if (items) dispatch(addItemsToCart(JSON.parse(items)));

  return (
    <React.Fragment>
      <Router>
        <Header />
          <Switch>
            <Route path="/catalog/:id" component={ItemCard} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/about" component={About} />
            <Route path="/cart" component={Cart} />
            <Route exact path="/" component={IndexPage}/>
            <Route component={Page404} />
          </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
}