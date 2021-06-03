/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { fetchSearchBirds, clearSearchBirds } from '../actions';

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      showDropdown: false,
      input: "",
    };
  }

  componentDidMount() {
    this.props.clearSearchBirds();
  }

  handleChange = (event) => {
    const { fetchSearchBirds, langPref, popThreshold } = this.props;
    const input = event.target.value;

    this.state.input = input;
    fetchSearchBirds(input, langPref, popThreshold);
  };

  handleFocus = (event) => {
    this.setState({ showDropdown: true });
  };

  handleBlur = (event) => {
    // don't hide dropdown if an anchor gets clicked
    if (!event.relatedTarget) {
      this.setState({ showDropdown: false });
    }
  };

  render() {
    const { results, langPref } = this.props;

    const listItemContent = ({
      scientific_name,
      english_name,
      swedish_name,
      family,
      order,
    }) => {
      const c = [];
      let url = "";

      c.push(
        <p key={scientific_name}>
          <em>{scientific_name}</em>
        </p>
      );

      if (langPref !== "se") {
        c.push(<p key={english_name}>{english_name}</p>); // add english_name for en & both
      }
      if (langPref !== "en") {
        c.push(<p key={swedish_name}>{swedish_name}</p>); // add english_name for se & both
      }

      if (this.props.groupByPref === "order") {
        url = `/orders/${order.scientific_name}`;
      } else {
        url = `/families/${family.scientific_name}`;
      }

      url += `#${scientific_name}`;

      return <Link to={url}><div>{c}</div></Link>;
    };

    const listItems = () => {
      if (results.length === 0 && this.state.input.length > 0)
        return <li><div><p>Sorry, no results</p></div></li>;

      return results.map((bird) => (
        <li key={bird.scientific_name}>{listItemContent(bird)}</li>
      ));
    };

    const dropdownClasses = this.state.showDropdown ? "" : " d-none";

    return (
      <div id="search-bar-container">
        <input
          type="text"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />

        <ul className={dropdownClasses}>{listItems()}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.birdSearchResults,
  langPref: state.settingsData.language,
  popThreshold: state.settingsData.populationThreshold,
  groupByPref: state.settingsData.groupBy,
});

// eslint-disable-next-line arrow-body-style
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSearchBirds, clearSearchBirds }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
