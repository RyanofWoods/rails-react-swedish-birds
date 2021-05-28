import { FETCH_GROUP, MARK_SEEN, SORT_BIRDS } from '../actions';

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

  const sortBirds = (birds, sortBy, userLangPref = null) => {
    if (!sortBy) return birds;

    let [key] = Object.keys(sortBy);
    const order = sortBy[key];

    if (key === 'name') {
      if (userLangPref === 'se') {
        key = 'swedish_name';
      } else {
        key = 'english_name';
      }
    }

    const sortedBirds = [...birds].sort((a, b) => {
      // handle by booleans
      if (key === 'seen') {
        if (a[key] === b[key]) {
          return 0;
        } if (a[key]) {
          return order === 'asc' ? -1 : 1;
        }
        return order === 'asc' ? 1 : -1;
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
      sortedBirds: sortBirds(state.birds, newSortedBy, userLangPref),
      sortedBy: newSortedBy,
    };
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
      return {
        ...state,
        ...handleSortHeaderClick(action.payload),
      };
    default:
      return state;
  }
};

export default selectedGroupReducer;
