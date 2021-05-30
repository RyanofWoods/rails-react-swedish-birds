import { FETCH_GROUPS, MARK_SEEN, SORT_GROUPS } from '../actions';

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

    if (groupIndex !== -1) {
      stateCopy.groups[groupIndex].total_seen += 1;
    }

    return stateCopy;
  };

  const sortGroups = (groups, sortBy, userLangPref = null) => {
    if (!sortBy) return groups;

    let [key] = Object.keys(sortBy);
    const order = sortBy[key];

    if (key === 'name') {
      if (userLangPref === 'se') {
        key = 'swedish_name';
      } else {
        key = 'english_name';
      }
    }

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

  const handleSortHeaderClick = ({ clickedHeader, userLangPref }) => {
    let newSortedBy = {};

    // if the key exists, increment it null > asc > desc
    if (state.sortedBy && clickedHeader in state.sortedBy) {
      if (state.sortedBy[clickedHeader] === 'asc') {
        newSortedBy[clickedHeader] = 'desc';
      } else {
        newSortedBy = null;
      }
    } else { // it is null or a different clicked header
      newSortedBy[clickedHeader] = 'asc';
    }

    return {
      sortedGroups: sortGroups(state.groups, newSortedBy, userLangPref),
      sortedBy: newSortedBy,
    };
  };

  switch (action.type) {
    case FETCH_GROUPS:
      return {
        ...action.payload,
        sortedGroups: sortGroups(action.payload.groups, state.sortedBy),
      };
    case MARK_SEEN:
      return updatedState(
        action.payload.family_scientific_name,
        action.payload.order_scientific_name,
      );
    case SORT_GROUPS:
      return {
        ...state,
        ...handleSortHeaderClick(action.payload),
      };
    default:
      return state;
  }
};

export default groupsReducer;
