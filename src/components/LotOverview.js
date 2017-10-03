import React, { Component } from 'react';

import { connect } from 'react-redux';

import { findSpaces } from '../actions';

class LotOverview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      occupied: false,
    }
  }

  componentWillReceiveProps(newProps) {
    // Check to make sure this is actually a new lot and not the
    // one we just came from.
    if (this.props.id !== newProps.id) {
      this.props.getOneLot(newProps.id)
    }
  }

  render() {
    console.log("lot id")
    console.log(this.props.id)
    console.log("number of spaces")
    console.log(this.props.parkingSpots)

    const spots = this.props.parkingSpots.map( (spot, id) => {
      if (spot === null) {
        return (
          <div className="parking-spot empty" key={id}>{id}</div>
        )
      } else if (spot !== null) {
        return (
          <div className="parking-spot occupied" key={id}>{id}</div>
        )
      }
    })

    return(
      <div>
        <h1>Lot Overview</h1>
        <div className="parking-spot-container">
          {spots}
        </div>
       </div>
    )
  }
}

function mapS2p(state) {
  return {
    parkingLots: state.parkingLots,
    parkingSpots: state.parkingSpots,
  };
}


function mapD2P(dispatch) {
  return {
    getOneLot: function (lotId) {
      fetch("https://rocky-forest-92987.herokuapp.com/lots/" + lotId)
        .then(resp => resp.json())
        .then( spots => {
          dispatch(findSpaces(spots.spaces))
        })
    }
  }
}

export default connect(mapS2p, mapD2P)(LotOverview);
