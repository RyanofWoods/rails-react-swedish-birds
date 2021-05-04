import { FETCH_FAMILY } from '../actions';

const selectedFamilyReducer = (state = [], action) => {
  console.log(action);

  switch (action.type) {
    case FETCH_FAMILY:
      return action.payload.birds;
    default:
      return state;
  }
}

export default selectedFamilyReducer;
