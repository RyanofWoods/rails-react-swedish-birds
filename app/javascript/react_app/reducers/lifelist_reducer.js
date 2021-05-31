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

  const sortLifelist = (lifelist, sortBy) => {
    if (!sortBy) return [...lifelist];

    const [key] = Object.keys(sortBy);
    const order = sortBy[key];

    if (key === 'index' || key === 'date') {
      if (order === 'desc') {
        return [...lifelist].reverse();
      }
      return [...lifelist];
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
      sortedLifelist: sortLifelist(state.lifelist, newSortedBy),
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
