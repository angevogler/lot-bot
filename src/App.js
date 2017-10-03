import React, { Component } from 'react';
import './styles/style.css';

// import components
import Home from './components/Home'
import LotList from './components/LotList';
import LotOverview from './components/LotOverview';
import TransactionReport from './components/TransactionReport';

// import browser router stuff
import { Switch, Route, Link, withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <ul className="main-nav">
              <li className="nav-symbol"><Link to="/">Home</Link></li>
              <li><Link to="/lots">View Lots</Link></li>
              <li><Link to="/transactions">Transaction Report</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/lots/:id" component={LotOverview} />
            <Route path="/lots" component={LotList} />
            <Route path="/transactions" component={TransactionReport} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
