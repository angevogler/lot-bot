export function findLots (lots) {
  return {
    type: "FIND_LOTS",
    payload: lots,
  }
}

export function findSpaces (spaces) {
  return {
    type: "FIND_SPACES",
    payload: spaces,
  }
}

export function findTransactions(cash) {
  return {
    type: "FIND_CASH",
    payload: cash,
  }
}
