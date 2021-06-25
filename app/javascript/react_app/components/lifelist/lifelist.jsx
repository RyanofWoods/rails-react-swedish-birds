import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchLifelist, sortLifelist } from '../../actions';
import { nameContent } from '../../helpers/utils';

import BackLink from '../shared/back_link';
import OptionsBar from '../shared/options_bar';
import GroupHeader from '../shared/group_header';

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

    const backLinkProps = {
      to: '/',
    };

    return (
      <>
        <h1>Lifelist</h1>

        <BackLink {...backLinkProps} />
        <OptionsBar backLinkProps={backLinkProps} />

        <ol className="list-group mt-3">
          <GroupHeader {...groupHeaderProps} />

          {lifelist.map(({ created_at, bird, index }) => (
            <li className="list-group-item" key={bird.scientific_name}>
              <p className="list-item-start-small">{index}</p>
              {nameContent(bird, userLangPref)}
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
