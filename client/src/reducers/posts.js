import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  LIKE,
  DELETE,
  FETCH_BY_SEARCH,
} from "./../constants/actionTypes"

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case CREATE:
      return [...posts, action.payload]
    case UPDATE:
    case LIKE: // both cases are the same
      return posts.map(post =>
        action.payload._id === post._id ? action.payload : post
      )
    case FETCH_BY_SEARCH:
      return action.payload
    case DELETE:
      return posts.filter(post => post._id !== action.payload)
    default:
      return posts
  }
}
