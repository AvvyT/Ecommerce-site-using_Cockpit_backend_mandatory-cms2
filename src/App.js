import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './components/Home';
import Article from './components/Article';
import Bag from './components/Bag';
import Checkout from './components/Checkout';
import Finish from './components/Finish';
import { item$, getTotalPrice } from './components/store';
import './App.css';

function App() {
  const [bag, updateBag] = useState(item$.value);

  useEffect(() => {
    let subscription = item$.subscribe((newBag) => {
      updateBag(newBag);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App-header">
        <header className='header'>
          <h2 className='text'><Link to="/">Avvys Webbshop!</Link></h2>
          <button className='my-bag'><span className='span'>{getTotalPrice() + ' SEK'}</span><Link to={'/bag/all-articles/' + bag.length}>Bag {bag.length}</Link></button>
        </header>

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



