import { FETCH_GROUPS, MARK_SEEN } from '../actions';

const groupsReducer = (state, action) => {
  if (state === undefined) {
    return {
      groups: [],
    };
  }

  const updatedState = (familyScientfic, orderScientific) => {
    if (state.groups.length === 0) return state;

    const stateCopy = { ...state };
    const checkName = (state.groupBy === 'order') ? orderScientific : familyScientfic;

    const groupIndex = stateCopy.groups.findIndex(
      (group) => group.scientific_name === checkName,
    );

    stateCopy.total_seen += 1;

    if (groupIndex !== -1) {
      stateCopy.groups[groupIndex].total_seen += 1;
    }

    return stateCopy;
  };

  switch (action.type) {
    case FETCH_GROUPS:
      return action.payload;
    case MARK_SEEN:
      return updatedState(
        action.payload.family_scientific_name,
        action.payload.order_scientific_name,
      );
    default:
      return state;
  }
};

export default groupsReducer;
