import { FETCH_FAMILIES } from '../actions';

const familiesReducer = (state = [], action) => {
  console.log(action);

  switch (action.type) {
    case FETCH_FAMILIES:
      return action.payload.families;
    default:
      return state;
  }
}

export default familiesReducer;
