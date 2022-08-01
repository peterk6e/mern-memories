import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  LIKE,
  DELETE,
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "./../constants/actionTypes"

export default (state = { isLoading: true, posts: [] }, action) => {
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
    case FETCH_POST:
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
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
