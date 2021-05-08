import { LOAD_SETTINGS, SAVE_SETTINGS } from "../actions";

const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SETTINGS:
      return action.payload;
    case SAVE_SETTINGS:
      return action.payload;
    default:
      return state;
  }
}

export default settingsReducer;
