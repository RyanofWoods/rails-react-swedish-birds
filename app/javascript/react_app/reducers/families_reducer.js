import { FETCH_FAMILIES } from '../actions';

const familiesReducer = (state, action) => {
  if (state === undefined) {
    return {
      families: []
    }
  }

  switch (action.type) {
    case FETCH_FAMILIES:
      return action.payload;
    default:
      return state;
  }
}

export default familiesReducer;
