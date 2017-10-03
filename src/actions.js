export function findLots (lots) {
  return {
    type: "FIND_LOTS",
    payload: lots,
  }
}
