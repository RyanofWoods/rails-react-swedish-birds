import { FETCH_LIFELIST, SORT_LIFELIST } from '../actions';
import { handleSortHeaderClick } from '../helpers/sorting';

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

  switch (action.type) {
    case FETCH_LIFELIST:
      const lifelistWithIndexes = addIndex(action.payload.observations);
      return {
        lifelist: lifelistWithIndexes,
        sortedLifelist: sortLifelist(lifelistWithIndexes),
      };
    case SORT_LIFELIST:
      const result = handleSortHeaderClick({
        sortingFunction: sortLifelist,
        groups: state.lifelist,
        prevSortedBy: state.sortedBy,
        ...action.payload,
      });
      return {
        ...state,
        sortedLifelist: result.sortedGroups,
        sortedBy: result.sortedBy,
      };
    default:
      return state;
  }
};

export default lifelistReducer;
