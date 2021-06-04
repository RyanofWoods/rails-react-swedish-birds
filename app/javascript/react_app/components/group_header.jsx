import React from 'react';

const GroupHeader = ({
  action, sortedBy, userLangPref, columns,
}) => {
  const sortedByIndicator = (header) => {
    if (!sortedBy) return null;

    const getSymbol = (orderedBy) => {
      switch (orderedBy) {
        case 'asc':
          return '∧';
        case 'desc':
          return '∨';
        default:
          return '';
      }
    };

    const getShorthand = (lang) => {
      switch (lang) {
        case 'english_name':
          return 'EN';
        case 'swedish_name':
          return 'SE';
        default:
          return '';
      }
    };

    const [key] = Object.keys(sortedBy);

    if (header === key) {
      return getSymbol(sortedBy[key]);
    } if (header === 'name' && (key === 'english_name' || key === 'swedish_name')) {
      return `(${getShorthand(key)} ${getSymbol(sortedBy[key])})`;
    }
    return null;
  };

  const text = ({ title, sortRef, replace }, reverse) => {
    const indicator = sortedByIndicator(sortRef);

    // if set to true and items were sorted by this column
    // return indicator, otherwise just the title
    if (replace) {
      return (indicator) || title;
    }

    const t = [];

    t.push(title);
    t.push(' ');
    t.push(indicator);

    if (reverse) t.reverse();

    return t;
  };

  const content = (column, index) => {
    let classes = 'hover-pointer';
    let reverse = false;

    if (index === 0) {
      classes += ' list-item-start';
    // at least the third elem and is the last element
    } else if (index >= 2 && index + 1 === columns.length) {
      classes += ' list-item-end';
      reverse = true;
    } else {
      classes += ' list-item-grow';
    }

    if (column.small) classes += '-small';

    let onClick;

    if (column.sortRef === 'name') {
      onClick = () => action(column.sortRef, userLangPref);
    } else {
      onClick = () => action(column.sortRef);
    }

    const props = {
      key: column.title,
      className: classes,
      onClick,
    };

    return <p {...props}>{text(column, reverse)}</p>;
  };

  return (
    <li key="group-header" id="group-header" className="list-group-item">
      {
        columns.map((column, index) => (
          content(column, index)
        ))
      }
    </li>
  );
};

export default GroupHeader;
