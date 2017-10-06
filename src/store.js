import { createStore } from 'redux';

function reducer (state, action) {

  if (action.type === "FIND_LOTS") {
    return {
      parkingLots: state.parkingLots.concat(action.payload),
      parkingSpots: state.parkingSpots,
      transactions: state.transactions,
    }
  }

  if (action.type === "FIND_SPACES") {
    return {
      parkingLots: state.parkingLots,
      parkingSpots: action.payload,
      transactions: state.transactions,
    }
  }

  if (action.type === "FIND_CASH") {
    return {
      parkingLots: state.parkingLots,
      parkingSpots: state.parkingSpots,
      transactions: state.transactions.concat(action.payload),
    }
  }

  return state;
}

export const store = createStore(reducer, {
  parkingLots: [],
  parkingSpots: [],
  transactions: [],
})
