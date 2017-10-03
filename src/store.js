import { createStore } from 'redux';

function reducer (state, action) {

  if (action.type === "FIND_LOTS") {
    return {
      parkingLots: state.parkingLots,
    }
  }

  return state;
}

export const store = createStore(reducer, {
  parkingLots: [],
})
