import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  LIKE,
  DELETE,
  FETCH_BY_SEARCH,
} from "./../constants/actionTypes"

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data }
    case UPDATE:
    case LIKE: // both cases are the same
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      }
    default:
      return state
  }
}
