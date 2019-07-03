export const RECEIVE_DESKS = 'RECEIVE_DESKS'
export const ADD_DESK = 'ADD_DESK'

export function receiveDesks (desks) {
  return {
    type: RECEIVE_DESKS,
    desks,
  }
}

export function addDesk (desk) {
  return {
    type: ADD_DESK,
    desk,
  }
}