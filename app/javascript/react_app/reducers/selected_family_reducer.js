import { FETCH_FAMILY, MARK_SEEN } from "../actions";

const selectedFamilyReducer = (state, action) => {
  if (state === undefined) {
    return {
      birds: [],
    };
  }

  switch (action.type) {
    case FETCH_FAMILY:
      return action.payload;
    case MARK_SEEN:
      return state;
    default:
      return state;
  }
}

export default selectedFamilyReducer;
