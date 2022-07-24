import { AUTH, LOGOUT } from "./../constants/actionTypes"

const authReducer = (state = null, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action?.data)
      return state
    case LOGOUT:
      return state
    default:
      return state
  }
}

export default authReducer
