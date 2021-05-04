import { FETCH_FAMILY } from '../actions';

const selectedFamilyReducer = (state, action) => {
  if (state === undefined) {
    return {
      birds: [],
    };
  }

  switch (action.type) {
    case FETCH_FAMILY:
      return action.payload;
    default:
      return state;
  }
}

export default selectedFamilyReducer;
