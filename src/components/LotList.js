import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { findLots } from '../actions';
import LotOverview from './LotOverview';

class LotList extends Component {

  // fetch the list of lots when the page loads
  // runs the get request when the page loads
  componentDidMount() {
    this.props.getAllLots()
  }

  render() {
    // variable for the parking lot list
    const parking = this.props.parkingLots.map( lot => {
      return(
        <li key={lot.id}>
          <Link to={"/lots/" + lot.id}>
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
        <div className="overview-container">
          <LotOverview id={this.props.match.params.id}/>
        </div>
      </div>
    )
  }
}

// need to bring in parkingLots from redux
function mapS2p(state) {
  return {
    parkingLots: state.parkingLots,
  }
}


// get request to update parkingLots state in redux
function mapD2P(dispatch) {
  return {
    getAllLots: function() {
      fetch("https://rocky-forest-92987.herokuapp.com/lots")
        .then(resp => resp.json())
        .then(response => {
          dispatch(findLots(response))
        })
    }
  };
}

export default connect(mapS2p, mapD2P) (LotList);
