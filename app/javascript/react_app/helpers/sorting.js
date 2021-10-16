const determineSortBy = ({ prevSortedBy, clickedHeader, userLangPref }) => {
  let newSortedBy = {};

  const newSortBy = () => {
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
  if (prevSortedBy) {
    if (clickedHeader in prevSortedBy || (clickedHeader === 'name' && (Object.keys(prevSortedBy)[0] === 'english_name' || Object.keys(prevSortedBy)[0] === 'swedish_name'))) {
      const key = (clickedHeader === 'name') ? Object.keys(prevSortedBy)[0] : clickedHeader;

      if (prevSortedBy[key] === 'asc') {
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
      newSortBy();
    }
  } else {
    // was null
    newSortBy();
  }

  return newSortedBy;
};

const handleSortHeaderClick = (args) => {
  const {
    sortingFunction, groups,
  } = args;

  const newSortedBy = determineSortBy(args);

  return {
    sortedGroups: sortingFunction(groups, newSortedBy),
    sortedBy: newSortedBy,
  };
};

export default handleSortHeaderClick;
