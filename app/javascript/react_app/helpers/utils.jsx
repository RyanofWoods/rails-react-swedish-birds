/* eslint-disable camelcase */
import React from 'react';

export default function nameContent({ english_name, swedish_name }, LangPref) {
  switch (LangPref) {
    case 'en':
      return <p className="list-item-grow">{english_name}</p>;
    case 'se':
      return <p className="list-item-grow">{swedish_name}</p>;
    default:
      return (
        <div className="list-item-grow">
          <p>{english_name}</p>
          <p>{swedish_name}</p>
        </div>
      );
  }
}
