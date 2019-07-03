import { RECEIVE_DESKS, ADD_DESK, ADD_CARD } from '../actions'

function desks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DESKS :
      return {
        ...state,
        ...action.desks
      }
    case ADD_DESK :
      return {
        ...state,
        ...action.desk
      }
    default :
      return state
  }
}

export default desks