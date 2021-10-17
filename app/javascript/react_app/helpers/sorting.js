const nameHash = {
  en: 'english_name',
  se: 'swedish_name',
};

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

  const sameHeaderClick = () => (
    clickedHeader in prevSortedBy || (clickedHeader === 'name' && Object.values(nameHash).includes(Object.keys(prevSortedBy)[0]))
  );

  const incrementSortBy = () => {
    const key = Object.keys(prevSortedBy)[0];

    if (prevSortedBy[key] === 'asc') {
      newSortedBy[key] = 'desc';
    } else if (userLangPref === 'both' && key === 'english_name') {
      newSortedBy.swedish_name = 'asc';
    } else {
      newSortedBy = null;
    }
  };

  if (prevSortedBy && sameHeaderClick()) {
    incrementSortBy();
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

export { determineSortBy, handleSortHeaderClick };
