import { FETCH_GROUPS } from '../actions';

const groupsReducer = (state, action) => {
  if (state === undefined) {
    return {
      groups: []
    }
  }

  switch (action.type) {
    case FETCH_GROUPS:
      return action.payload;
    default:
      return state;
  }
}

export default groupsReducer;
