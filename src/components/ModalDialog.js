import React, { Component } from 'react';

class ModalDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spaceship: {
        shipId: '',
        color: '',
      }
    }
  }

  updateLP(lp) {
    this.setState({
      spaceship: {
        shipId: lp.target.value,
        color: this.state.spaceship.color,
      }
    })
  }

  updateColor(color) {
    this.setState({
      spaceship: {
        shipId: this.state.spaceship.shipId,
        color: color.target.value,
      }
    })
  }

  // function to undock a ship
  // could I write the updateLP & updatedColor functions within this??
  dockShip() {
    console.log(this.state.spaceship)
    this.props.onChangeValue({
        shipId: this.state.spaceship.shipId,
        color: this.state.spaceship.color,
    })
  }

  // function to dock a ship
  undockShip() {
    console.log(this.state.spaceship)
    this.props.onChangeValue({
        shipId: "",
        color: "",
    })
  }

  render() {

    console.log(this.props.parked)

    // if a spaceship is docked render a modal to undock the ship
    if (this.props.parked) {
      return(
        <div className="modal-dialog">
          <div className="exit-button">x</div>
          <h3>Dock #: {this.props.dock}</h3>
          <button onClick={ () => this.undockShip() }>Dock</button>
        </div>
      )
    // if a spaceship is not docked render a modal to dock a ship
    } else {
      return(
        <div className="modal-dialog">
          <div className="exit-button">x</div>
          <h3>Dock #: {this.props.dock}</h3>
          <div className="parking-form">
            <input type="text" placeholder="License Plate #"
              onChange={ (lp) => this.updateLP(lp) }/>
            <input type="text" placeholder="Shuttle Color"
              onChange={ (color) => this.updateColor(color) }/>
            <button onClick={ () => this.dockShip() }>Dock</button>
          </div>
        </div>
      )
    }
  }
}

export default ModalDialog;
