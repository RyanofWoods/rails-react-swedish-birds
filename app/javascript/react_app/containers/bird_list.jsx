import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchGroup, sortBirds } from '../actions';

import Bird from './bird';
import BackLink from '../components/back_link';
import GroupHeader from '../components/group_header';
import PageTitle from '../components/page_title';

class BirdList extends Component {
  componentDidMount() {
    const { groupedBy, groupName } = this.props.match.params;

    this.props.fetchGroup(groupedBy, groupName, this.props.popThres);
  }

  componentDidUpdate() {
    const { hash } = this.props.location;

    if (hash !== '') {
      const e = document.getElementById(hash.slice(1));

      if (e) {
        const header = document.getElementById('group-header');
        const headerHeight = header ? header.getBoundingClientRect().height : 0;

        const yPos = e.getBoundingClientRect().top - headerHeight;

        window.scrollTo(0, yPos);
      }
    }
  }

  render() {
    const {
      sortedBirds, totalSeen, totalBirds, englishName, scientificName, userLangPref, sortedBy,
    } = this.props;

    const title = englishName || scientificName || '...';

    const groupHeaderProps = {
      sortedBy,
      action: this.props.sortBirds,
      userLangPref,
      columns: [
        { title: 'Seen', sortRef: 'seen' },
        { title: 'Names', sortRef: 'name' },
        { title: 'Details', sortRef: 'details' },
      ],
    };

    const titleProps = {
      title,
      totalSeen,
      totalAmount: totalBirds,
    };

    return (
      <>
        <PageTitle {...titleProps} />
        <BackLink to="/" />

        <ul className="list-group mt-3">
          <GroupHeader {...groupHeaderProps} />

          {
            sortedBirds.map((birdProps) => (
              <Bird key={birdProps.scientific_name} langPref={userLangPref} {...birdProps} />
            ))
          }
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  scientificName: state.selectedGroupData.group_scientific_name,
  englishName: state.selectedGroupData.group_english_name,
  swedishName: state.selectedGroupData.group_swedish_name,
  totalSeen: state.selectedGroupData.total_seen,
  totalBirds: state.selectedGroupData.total_birds,
  sortedBy: state.selectedGroupData.sortedBy,
  sortedBirds: state.selectedGroupData.sortedBirds,
  userLangPref: state.settingsData.language,
  popThres: state.settingsData.populationThreshold,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchGroup, sortBirds }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BirdList);
