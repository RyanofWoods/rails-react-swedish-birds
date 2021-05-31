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
      sortedBirds: sortBirds(state.birds, newSortedBy),
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
