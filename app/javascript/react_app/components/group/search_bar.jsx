import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { fetchSearchBirds, clearSearchBirds } from '../../actions';
import '../../helpers/extend_string_class';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      input: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.props.clearSearchBirds();
  }

  handleChange(event) {
    const { langPref, popThreshold } = this.props;
    const input = event.target.value;

    this.state.input = input;
    this.props.fetchSearchBirds(input, langPref, popThreshold);
  }

  handleFocus() {
    this.setState({ showDropdown: true });
  }

  handleBlur(event) {
    // don't hide dropdown if an anchor gets clicked
    if (!event.relatedTarget) {
      this.setState({ showDropdown: false });
    }
  }

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
      let url = '';

      c.push((
        <p key={scientific_name}>
          <em>{scientific_name}</em>
        </p>
      ));

      if (langPref !== 'se') {
        c.push(<p key={english_name}>{english_name}</p>); // add english_name for en & both
      }
      if (langPref !== 'en') {
        c.push(<p key={swedish_name}>{swedish_name}</p>); // add english_name for se & both
      }

      if (this.props.groupByPref === 'order') {
        url = `/orders/${order.scientific_name}`;
      } else {
        url = `/families/${family.scientific_name}`;
      }

      const linkProps = {
        to: {
          pathname: url,
          hash: scientific_name.hashify(),
        },
      };

      return <Link {...linkProps}><div>{c}</div></Link>;
    };

    const unorderedList = () => {
      // no input
      if (this.state.input.length === 0) return null;

      // no results
      if (results.length === 0) {
        return (
          <ul>
            <li>
              <div>
                <p>Sorry, no results</p>
              </div>
            </li>
          </ul>
        );
      }

      // input and results
      return (
        <ul>
          {
            results.map((bird) => (
              <li key={bird.scientific_name}>{listItemContent(bird)}</li>
            ))
          }
        </ul>
      );
    };

    return (
      <div id="search-bar-container" className="form-group">
        <input
          type="text"
          placeholder="Search for a bird..."
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className="form-control"
        />

        {
          this.state.showDropdown && unorderedList()
        }
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
