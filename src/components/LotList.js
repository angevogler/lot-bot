import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import LotOverview from './LotOverview';

class LotList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lots: [],
      spaces: 1,
    }
  }

  // fetch the list of lots when the page loads
  componentDidMount() {
    fetch("https://rocky-forest-92987.herokuapp.com/lots")
      .then(resp => resp.json())
      .then(response => {
        this.setState({
          lots: response,
        })
      })
  }

  render() {
    console.log("lots array:")
    console.log(this.state.lots)

    const parking = this.state.lots.map( lot => {
      return(
        <li key={lot.id}>
          <Link to={"/lots:" + lot.id}>
            <h3>Parking Lot {lot.id}</h3>
            <p>Total Spaces: <span>{lot.spaces.length}</span></p>
            <p>Occupied Spaces: <span>????</span></p>
          </Link>
        </li>
      )
    })
    return(
      <div className="lot-container">
        <div className="list-container">
          <h1>Lot List</h1>
          <ul>
            {parking}
          </ul>
        </div>
        <div class="overview-container">
          <LotOverview />
        </div>
      </div>
    )
  }
}

export default LotList;
