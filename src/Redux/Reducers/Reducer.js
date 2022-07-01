
const INITIAL_STATE = {
  isFetching: false,
  singlePost: {},
  author: {},
  searchStr: '',
}


const Reducer = (state = INITIAL_STATE, action) =>{
  switch(action.type) {
    case "FETCH_POST_DETAILS":
      return { ...state, singlePost: action.payload, isFetching: false }
    case "FETCH_AUTHOR":
      return { ...state, author: action.payload, isFetching: false }
    case "SET_LOADER":
      return { ...state, isFetching: action.payload }
    case "SET_SEARCH_STR":
      return { ...state, searchStr: action.payload }

    default:
      return state;
  }
}


export default Reducer;