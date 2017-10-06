import React, { Component } from 'react';

import { connect } from 'react-redux';

import { findSpaces } from '../actions';

import ModalDialog from './ModalDialog';

class LotOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      dock: -1,
      spaceship: {
        shipId: "",
        color: "",
      },
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

  // logic on when to display the modal
  toggleModal(id) {
    // open the modal when you click on a parking space
    if (this.state.dock === -1) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        dock: id,
      }, () => console.log("dock number: " + this.state.dock))
    // if the modal is already opened and a new space is clicked on
    // change the modal to correspond with that space
    } else if (this.state.dock !== -1 && this.state.dock !== id && this.state.modalVisible === true) {
      this.setState({
        dock: id,
      }, () => console.log("new dock number: " + this.state.dock))
    // if the clicked space corresponds with the modal
    // close the modal
    } else if (this.state.dock === id && this.state.modalVisible === true) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        dock: -1,
      }, () => console.log("dock number: " + this.state.dock))
    }
  }

  // function to handle the docking/undocking of a spaceship
  handleDock(event){
    // dock the spaceship
    // set the state equal to be the input of the modal
    this.setState({
      spaceship: {
        shipId: event.shipId,
        color: event.color
      },
    }, () => {
      // post request to add the spaceship to the API
      fetch('https://rocky-forest-92987.herokuapp.com/lots/' + this.props.id + "/" + this.state.dock, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            spaceship: this.state.spaceship,
        }),
      })
      .then( () => {
            // reset everything in the state and mark the space as occupied
            this.props.getOneLot(this.props.id)
            this.setState({
              modalVisible: false,
              spaceship: {
                shipId: "",
                color: "",
              },
              occupied: true,
            })
        }
      )
    })
  }

  render() {
    // variable describing which kind of spot to render
    const spots = this.props.parkingSpots.map( (spot, id) => {
      if (spot.gimmeCash === null && (id % 2) === 0) {
        return (
          <div className="parking-spot empty left" key={id}
          onClick={ () => this.toggleModal(id) }>Dock #: {id}</div>
        )
      } else if (spot.gimmeCash === null && (id % 2) !== 0){
        return (
          <div className="parking-spot empty right" key={id}
          onClick={ () => this.toggleModal(id) }>Dock #: {id}</div>
        )
      }
      else if (spot.gimmeCash !== null && (id % 2) === 0) {
        return (
          <div className="parking-spot occupied left" key={id}
          onClick={ () => this.toggleModal(id) }>Dock #: {id}
            <div className="plane-container">
            <i className="fa fa-fighter-jet"></i>
            </div>
          </div>
        )
      } else if (spot.gimmeCash !== null && (id % 2) !== 0) {
        return (
          <div className="parking-spot occupied right" key={id}
          onClick={ () => this.toggleModal(id) }>Dock #: {id}
            <div className="plane-container">
            <i className="fa fa-fighter-jet"></i>
            </div>
          </div>
        )
      }
    })

    if (this.state.modalVisible) {
      return (
        <div>
          <h1>Lot Overview - Lot {this.props.id}</h1>
          <ModalDialog parked={this.state.occupied} dock={this.state.dock} onChangeValue={ (event) => this.handleDock(event)}/>
          <div className="parking-spot-container">
            {spots}
          </div>
         </div>
      )
    } else {
      return(
        <div>
          <h1>Lot Overview - Lot {this.props.id}</h1>
          <div className="parking-spot-container">
            {spots}
          </div>
         </div>
      )
    }
  }
}

// need to get parkingLots and parkingSpots from redux
function mapS2p(state) {
  return {
    parkingLots: state.parkingLots,
    parkingSpots: state.parkingSpots,
  };
}

// send the parking spot data from the API to redux
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
