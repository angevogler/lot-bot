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
      }
    }
  }

  componentWillReceiveProps(newProps) {
    // Check to make sure this is actually a new lot and not the
    // one we just came from.
    if (this.props.id !== newProps.id) {
      this.props.getOneLot(newProps.id)
    }
  }

  toggleModal(id) {
    if (this.state.dock === -1) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        dock: id,
      }, () => console.log("dock number: " + this.state.dock))
    } else if (this.state.dock !== -1 && this.state.dock !== id && this.state.modalVisible === true) {
      this.setState({
        dock: id,
      }, () => console.log("new dock number: " + this.state.dock))
    } else if (this.state.dock === id && this.state.modalVisible === true) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        dock: -1,
      }, () => console.log("dock number: " + this.state.dock))
    }
  }

  handleDock(event){
    console.log("this is the lot overview event")
    console.log(event);
    console.log(event.shipId);
    this.setState({
      spaceship: {
        shipId: event.shipId,
        color: event.color
      }
    }, () => {
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
            this.props.getOneLot(this.props.id)
            this.setState({
              modalVisible: false,
              spaceship: {
                shipId: "",
                color: "",
              }
            })
        }
      )
    })
  }

  render() {

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
      console.log(this.props.parkingSpots[this.props.id].gimmeCash)
      return (
        <div>
          <h1>Lot Overview - Lot {this.props.id}</h1>
          <ModalDialog parked={"parked"} dock={this.state.dock} onChangeValue={ (event) => this.handleDock(event)}/>
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
