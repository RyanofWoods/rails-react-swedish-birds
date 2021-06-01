import { SET_PREV_LOCATION } from '../actions';

const prevLocationReducer = (state = '/', action) => {
  switch (action.type) {
    case SET_PREV_LOCATION:
      return action.payload;
    default:
      return state;
  }
};

export default prevLocationReducer;
