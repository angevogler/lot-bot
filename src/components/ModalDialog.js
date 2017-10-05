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

  dockShip() {
    console.log(this.state.spaceship)
    this.props.onChangeValue({
        shipId: this.state.spaceship.shipId,
        color: this.state.spaceship.color,
    })
  }

  render() {

    if (this.props.parked) {
      console.log("success!!!")
    } else {
      console.log("not working :(")
    }

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

export default ModalDialog;
