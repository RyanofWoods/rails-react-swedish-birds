import { FETCH_FAMILY, MARK_SEEN } from "../actions";

const selectedFamilyReducer = (state, action) => {
  const updatedState = (name, seen) => {
    const stateCopy = { ...state };
    
    const birdIndex = stateCopy.birds.findIndex((elem) => elem.scientific_name === name);

    stateCopy.birds[birdIndex].seen = seen;
    stateCopy.total_seen += 1;
  
    return stateCopy;
  }

  if (state === undefined) {
    return {
      birds: [],
    };
  }

  switch (action.type) {
    case FETCH_FAMILY:
      return action.payload;
    case MARK_SEEN:
      if (action.payload.error) {
        return state;
      } else {
        return updatedState(
          action.payload.scientific_name,
          action.payload.seen
        );
      }
    default:
      return state;
  }
}

export default selectedFamilyReducer;
