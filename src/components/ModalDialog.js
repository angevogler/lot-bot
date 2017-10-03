import React, { Component } from 'react';

class ModalDialog extends Component {

  render() {

    return(
      <div className="modal-dialog">
        <div className="exit-button">x</div>
        <div className="parking-form">
          <input type="text" placeholder="License Plate #" />
          <input type="text" placeholder="Shuttle Color" />
          <button>Dock</button>
        </div>
      </div>
    )
  }
}

export default ModalDialog;
