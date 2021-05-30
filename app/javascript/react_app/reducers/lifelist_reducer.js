import { FETCH_LIFELIST, SORT_LIFELIST } from '../actions';

const lifelistReducer = (state = [], action) => {
  if (state === undefined) {
    return {
      lifelist: [],
      sortedlifelist: [],
    };
  }

  // eslint-disable-next-line arrow-body-style
  const addIndex = (lifelist) => {
    return [...lifelist].map((elem, i) => ({
      ...elem,
      index: i + 1,
    }));
  };

  const sortLifelist = (lifelist, sortBy, userLangPref = null) => {
    if (!sortBy) return lifelist;

    let [key] = Object.keys(sortBy);
    const order = sortBy[key];

    if (key === 'index' || key === 'date') {
      if (order === 'asc') {
        return lifelist;
      }
      return lifelist.reverse();
    }

    if (key === 'name') {
      if (userLangPref === 'se') {
        key = 'swedish_name';
      } else {
        key = 'english_name';
      }
    }

    const sortedLifelist = [...lifelist].sort((a, b) => {
      if (a.bird[key] < b.bird[key]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a.bird[key] > b.bird[key]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedLifelist;
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
    } else {
      // it is null or a different clicked header
      newSortedBy[clickedHeader] = 'asc';
    }

    return {
      sortedLifelist: sortLifelist(state.lifelist, newSortedBy, userLangPref),
      sortedBy: newSortedBy,
    };
  };

  switch (action.type) {
    case FETCH_LIFELIST:
      // eslint-disable-next-line no-undef
      // eslint-disable-next-line no-case-declarations
      const lifelistWithIndexes = addIndex(action.payload.observations);
      return {
        lifelist: lifelistWithIndexes,
        sortedLifelist: sortLifelist(lifelistWithIndexes),
      };
    case SORT_LIFELIST:
      return {
        ...state,
        ...handleSortHeaderClick(action.payload),
      };
    default:
      return state;
  }
};

export default lifelistReducer;
