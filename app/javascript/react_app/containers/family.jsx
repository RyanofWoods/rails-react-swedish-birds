import React, { Component } from 'react';
import "@fortawesome/fontawesome-free/css/all";
import "./family.scss";

class Family extends Component {
  render_bird ({ scientific_name, english_name, swedish_name, seen }) {
    let seenClasses = 'far fa-';
    seenClasses += seen ? 'check-square' : 'square'
 
    return (
      <li className="list-group-item" key={scientific_name}>
        <i className={seenClasses} />
        <p>{english_name} / {swedish_name}</p>
      </li>
    );
  }
  render() {
    const birds = [
      {
          "scientific_name": "Branta bernicla",
          "english_name": "Brant Goose",
          "swedish_name": "Prutgås",
          "seen": true
      },
      {
          "scientific_name": "Branta ruficollis",
          "english_name": "Red-breasted Goose",
          "swedish_name": "Rödhalsad Gås",
          "seen": false
      },
      {
          "scientific_name": "Branta canadensis",
          "english_name": "Canada Goose",
          "swedish_name": "Kanadagås",
          "seen": false
      }
    ]

    return (
      <div className="family-birds-container">
        <h1>{`FamilyName (0/100)`}</h1>

        <ul className="list-group">
          {
            birds.map((bird) => {
              return this.render_bird(bird);
            })
          }
        </ul>
      </div>
    );
  }
};

export default Family;
