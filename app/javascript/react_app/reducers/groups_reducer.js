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

  const handleSortHeaderClick = ({ clickedHeader, userLangPref }) => {
    const { sortedBy } = state;
    let newSortedBy = {};

    const newSort = () => {
      let key;

      if (clickedHeader === 'name') {
        if (userLangPref === 'se') {
          key = 'swedish_name';
        } else {
          key = 'english_name';
        }
      } else {
        key = clickedHeader;
      }
      newSortedBy[key] = 'asc';
    };

    // if the key exists, increment it null > asc > desc
    if (sortedBy) {
      if (clickedHeader in sortedBy || (clickedHeader === 'name' && (Object.keys(sortedBy)[0] === 'english_name' || Object.keys(sortedBy)[0] === 'swedish_name'))) {
        const key = (clickedHeader === 'name') ? Object.keys(sortedBy)[0] : clickedHeader;

        if (sortedBy[key] === 'asc') {
          newSortedBy[key] = 'desc';
        } else if (userLangPref === 'both' && key === 'english_name') {
          // increment through two languages before going back to null
          // en asc > en desc > se asc > se desc > null
          newSortedBy.swedish_name = 'asc';
        } else {
          newSortedBy = null;
        }
      } else {
        // new header click
        newSort();
      }
    } else {
      // was null
      newSort();
    }

    return {
      sortedGroups: sortGroups(state.groups, newSortedBy),
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
        action.payload.bird_family_scientific_name,
        action.payload.bird_order_scientific_name,
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
