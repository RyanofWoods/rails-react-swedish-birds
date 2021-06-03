/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLifelist, sortLifelist } from '../actions';

import BackLink from '../components/back_link';
import GroupHeader from '../components/group_header';

class Lifelist extends Component {
  componentDidMount() {
    this.props.fetchLifelist();
  }

  render() {
    const { lifelist, userLangPref, sortedBy } = this.props;

    const dateContent = (created_at) => {
      const date = new Date(created_at);
      return new Intl.DateTimeFormat('en-GB').format(date);
    };

    const nameContent = ({ english_name, swedish_name }) => {
      switch (userLangPref) {
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
    };

    const groupHeaderProps = {
      sortedBy,
      action: this.props.sortLifelist,
      userLangPref,
      columns: [
        {
          title: '#', sortRef: 'index', replace: true, small: true,
        },
        { title: 'Names', sortRef: 'name' },
        { title: 'Date', sortRef: 'date' },
      ],
    };

    return (
      <>
        <h1>Lifelist</h1>

        <BackLink to="/" />

        <ol className="list-group">
          <GroupHeader {...groupHeaderProps} />

          {lifelist.map(({ created_at, bird, index }) => (
            <li className="list-group-item" key={bird.scientific_name}>
              <p className="list-item-start-small">{index}</p>
              {nameContent(bird)}
              <small className="list-item-end text-muted">
                {dateContent(created_at)}
              </small>
            </li>
          ))}
        </ol>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  lifelist: state.lifelistData.sortedLifelist,
  sortedBy: state.lifelistData.sortedBy,
  userLangPref: state.settingsData.language,
});

// eslint-disable-next-line arrow-body-style
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchLifelist, sortLifelist }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Lifelist);
