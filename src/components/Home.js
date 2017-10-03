import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return(
      <div className="home-container">
        <h1>Welcome to Shuttle Docker</h1>
        <div>
          <button><Link to="/lots">View Lots</Link></button>
          <button><Link to="/transactions">Transaction Report</Link></button>
        </div>
      </div>
    )
  }
}

export default Home;
