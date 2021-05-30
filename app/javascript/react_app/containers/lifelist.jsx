/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLifelist } from '../actions';

class Lifelist extends Component {
  componentDidMount() {
    this.props.fetchLifelist();
  }

  render() {
    const { lifelist, userLangPref } = this.props;

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

    return (
      <>
        <h1>Lifelist</h1>

        <ol className="list-group">
          <li key="group-header" className="list-group-item group-header mt-2">
            <p className="pr-4">
              #
            </p>
            <p className="list-item-grow">
              Names
            </p>
            <p className="list-item-end">
              Date
            </p>
          </li>

          {lifelist.map(({ created_at, bird }, index) => (
            <li className="list-group-item" key={bird.scientific_name}>
              <p className="pr-4">{index + 1}</p>
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
  lifelist: state.lifelistData,
  userLangPref: state.settingsData.language,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchLifelist }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Lifelist);
