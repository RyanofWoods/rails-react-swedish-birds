import { FETCH_SEARCH_BIRDS, CLEAR_SEARCH_BIRDS } from '../actions';

const SearchReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_SEARCH_BIRDS:
      return action.payload;
    case CLEAR_SEARCH_BIRDS:
      return action.payload;
    default:
      return state;
  }
};

export default SearchReducer;
