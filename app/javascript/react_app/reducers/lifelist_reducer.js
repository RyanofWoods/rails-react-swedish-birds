import { FETCH_LIFELIST } from '../actions';

const lifelistReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_LIFELIST:
      return action.payload.observations;
    default:
      return state;
  }
};

export default lifelistReducer;
