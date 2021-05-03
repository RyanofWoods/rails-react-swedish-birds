import React, { Component } from 'react';

class FamilyList extends Component {
  render_family ({ scientific_name, english_name, swedish_name }) {
    return (
      <a href={`/families/${scientific_name}`}>
        <li className="list-group-item" key={scientific_name}>
          <p>{english_name} / {swedish_name}</p>
        </li>
      </a>
    );
  }
  render() {
    const families = [
      {
        scientific_name: "Anatidae",
        english_name: "Ducks, Geese and Swans",
        swedish_name: "Änder",
      },
      {
        scientific_name: "Phasianidae",
        english_name: "Pheasants and allies",
        swedish_name: "Fasanfåglar",
      },
      {
        scientific_name: "Caprimulgidae",
        english_name: "Nightjars",
        swedish_name: "Nattskärror",
      },
      {
        scientific_name: "Apodidae",
        english_name: "Swifts",
        swedish_name: "Seglare",
      },
      {
        scientific_name: "Otididae",
        english_name: "Bustards",
        swedish_name: "Trappar",
      },
      {
        scientific_name: "Cuculidae",
        english_name: "Cuckoos",
        swedish_name: "Gökar",
      },
    ];

    return (
      <ul className="list-group">
        {
          families.map((family) => {
            return this.render_family(family);
          })
        }
      </ul>
    );
  }
};

export default FamilyList;
