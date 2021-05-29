import { SET_FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } from '../actions';

const flashMessageReducer = (state = null, action) => {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return action.payload;
    case CLEAR_FLASH_MESSAGE:
      return null;
    default:
      return state;
  }
};

export default flashMessageReducer;
