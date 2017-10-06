import React, { Component } from 'react';

import { connect } from 'react-redux';

import { findTransactions } from '../actions';

class TransactionReport extends Component {

  componentDidMount() {
    this.props.getCash()
  }

  render() {
    console.log(this.props.transactions)

    const transactions = this.props.transactions.map( (cash, index) => {
      return (
        <ul key={index}>
          <li>
            <p>Ship Id: <span>{cash.spaceship.shipId}</span></p>
            <p>Price: <span>{cash.price}</span></p>
            <p>Checked In: <span>{cash.checkedInDate.month}, {cash.checkedInDate.dayOfMonth} at {cash.checkedInDate.hour}:{cash.checkedInDate.minute}</span></p>
            <p>Checked Out: <span>{cash.checkedOutDate.month}, {cash.checkedOutDate.dayOfMonth} at {cash.checkedOutDate.hour}:{cash.checkedOutDate.minute}</span></p>
          </li>
        </ul>
      )
    })

    return(
      <div className="transaction-container">
        <h1>Transaction Report</h1>
        <div>
          {transactions}
        </div>
      </div>
    )
  }
}

// need to get parkingLots and parkingSpots from redux
function mapS2p(state) {
  return {
    transactions: state.transactions,
  };
}

// send the parking spot data from the API to redux
function mapD2P(dispatch) {
  return {
    getCash: function () {
      fetch("https://rocky-forest-92987.herokuapp.com/transaction")
        .then(resp => resp.json())
        .then( response => {
          dispatch(findTransactions(response))
        })
    }
  }
}

export default connect(mapS2p, mapD2P)(TransactionReport);
