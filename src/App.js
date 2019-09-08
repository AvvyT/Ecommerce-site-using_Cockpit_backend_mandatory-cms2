import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './components/Home';
import Article from './components/Article';
import Bag from './components/Bag';
import Checkout from './components/Checkout';
import Finish from './components/Finish';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App-header">
        <h1>Avvys Webbshop!</h1>
        <Route path="/" exact component={Home} />
        <Route path="/article/:id" component={Article} />
        <Route path="/bag" component={Bag} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/finish" component={Finish} />

      </div>
    </Router>
  );
}

export default App;



