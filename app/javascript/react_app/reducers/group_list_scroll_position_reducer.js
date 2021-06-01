import { SET_GROUP_LIST_SCROLL_POSITION } from '../actions';

const groupListScrollPositionReducer = (state, action) => {
  if (!state) return { x: 0, y: 0 };

  switch (action.type) {
    case SET_GROUP_LIST_SCROLL_POSITION:
      return action.payload;
    default:
      return state;
  }
};

export default groupListScrollPositionReducer;
