import { LOCAL_SETTINGS, LOAD_SETTINGS, SAVE_SETTINGS } from '../actions';

const settingsReducer = (state = {}, action) => {
  if (typeof action.payload !== 'object') {
    return state;
  }

  const settingsCopy = { ...state };

  // get current state and update changed settings
  for (const [key, value] of Object.entries(action.payload)) {
    settingsCopy[key] = value;
  }

  switch (action.type) {
    case LOAD_SETTINGS:
      return settingsCopy;
    case SAVE_SETTINGS:
      localStorage.setItem(LOCAL_SETTINGS, JSON.stringify(settingsCopy));
      return settingsCopy;
    default:
      return state;
  }
};

export default settingsReducer;
