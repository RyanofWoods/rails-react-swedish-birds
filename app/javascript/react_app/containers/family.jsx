import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    return (
      <div className="family-birds-container">
        <h1>{`FamilyName (0/100)`}</h1>

        <a href="/families">Go Back</a>

        <ul className="list-group">
          {
            this.props.birds.map((bird) => {
              return this.render_bird(bird);
            })
          }
        </ul>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    birds: state.selectedFamilyBirds,
  };
}

export default connect(mapStateToProps, null)(Family);
