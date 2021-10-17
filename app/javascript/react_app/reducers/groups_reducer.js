import { FETCH_GROUPS, MARK_SEEN, SORT_GROUPS } from '../actions';
import { handleSortHeaderClick } from '../helpers/sorting';

const groupsReducer = (state, action) => {
  if (state === undefined) {
    return {
      groups: [],
      sortedGroups: [],
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

    // also updates sortedGroups as they are object references
    if (groupIndex !== -1) {
      stateCopy.groups[groupIndex].total_seen += 1;
    }

    return stateCopy;
  };

  const sortGroups = (groups, sortBy) => {
    if (!sortBy) return [...groups];

    const [key] = Object.keys(sortBy);
    const order = sortBy[key];

    const sortedGroups = [...groups].sort((a, b) => {
      // sort by seen percentage
      if (key === 'seen') {
        const aSeenPerc = (a.total_seen / a.total_birds) * 100;
        const bSeenPerc = (b.total_seen / b.total_birds) * 100;

        if (order === 'asc') {
          return aSeenPerc - bSeenPerc;
        }
        return bSeenPerc - aSeenPerc;
      }

      if (a[key] < b[key]) {
        return order === 'asc' ? -1 : 1;
      } if (a[key] > b[key]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedGroups;
  };

  switch (action.type) {
    case FETCH_GROUPS:
      return {
        ...action.payload,
        sortedGroups: sortGroups(action.payload.groups, state.sortedBy),
      };
    case MARK_SEEN:
      return updatedState(
        action.payload.bird_family_scientific_name,
        action.payload.bird_order_scientific_name,
      );
    case SORT_GROUPS:
      const result = handleSortHeaderClick({
        sortingFunction: sortGroups,
        groups: state.groups,
        prevSortedBy: state.sortedBy,
        ...action.payload,
      });
      return {
        ...state,
        sortedGroups: result.sortedGroups,
        sortedBy: result.sortedBy,
      };
    default:
      return state;
  }
};

export default groupsReducer;
