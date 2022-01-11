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


export default function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
          <Switch>
            <Route path="/catalog/:id" component={ItemCard} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/about" component={About} />
            <Route exact path="/" component={IndexPage}/>
            <Route component={Page404} />
          </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
}