import { LOCAL_SETTINGS, LOAD_SETTINGS, SAVE_SETTINGS } from '../actions';

const settingsReducer = (state = {}, action) => {
  if (typeof action.payload !== 'object') {
    return state;
  }

  // save updated state without mutating state directly
  const updatedSettings = { ...state, ...action.payload };

  switch (action.type) {
    case LOAD_SETTINGS:
      return updatedSettings;
    case SAVE_SETTINGS:
      localStorage.setItem(LOCAL_SETTINGS, JSON.stringify(updatedSettings));
      return updatedSettings;
    default:
      return state;
  }
};

export default settingsReducer;
