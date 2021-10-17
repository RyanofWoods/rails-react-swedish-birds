import { FETCH_GROUP, MARK_SEEN, SORT_BIRDS } from '../actions';
import { handleSortHeaderClick } from '../helpers/sorting';

const selectedGroupReducer = (state, action) => {
  if (state === undefined) {
    return {
      birds: [],
    };
  }

  const updatedState = (name, seen) => {
    const stateCopy = { ...state };

    const birdIndex = stateCopy.birds.findIndex((elem) => elem.scientific_name === name);

    stateCopy.birds[birdIndex].seen = seen;
    stateCopy.total_seen += 1;

    return stateCopy;
  };

  const sortBirds = (birds, sortBy) => {
    if (!sortBy) return [...birds];

    const [key] = Object.keys(sortBy);
    const order = sortBy[key];

    const sortedBirds = [...birds].sort((a, b) => {
      // handle by booleans
      if (key === 'seen') {
        if (a[key] === b[key]) {
          return 0;
        } if (a[key]) {
          return order === 'asc' ? 1 : -1;
        }
        return order === 'asc' ? -1 : 1;
      }

      if (a[key] < b[key]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedBirds;
  };

  switch (action.type) {
    case FETCH_GROUP:
      return {
        ...action.payload,
        sortedBirds: sortBirds(action.payload.birds, state.sortedBy),
      };
    case MARK_SEEN:
      if (action.payload.error) {
        return state;
      }
      return updatedState(
        action.payload.bird_scientific_name,
        action.payload.seen,
      );
    case SORT_BIRDS:
      const result = handleSortHeaderClick({
        sortingFunction: sortBirds,
        groups: state.birds,
        prevSortedBy: state.sortedBy,
        ...action.payload,
      });
      return {
        ...state,
        sortedBirds: result.sortedGroups,
        sortedBy: result.sortedBy,
      };
    default:
      return state;
  }
};

export default selectedGroupReducer;
