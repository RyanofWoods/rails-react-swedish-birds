import React, { Component } from 'react';

import BackLink from './back_link';

class OptionsBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOptionsBar: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  static handleGoUpClick() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  handleScroll() {
    const { showOptionsBar } = this.state;
    const hasScrollDown = window.scrollY > 80;

    // check showOptionsBar to avoid unnecessary setStates
    if (hasScrollDown && !showOptionsBar) {
      this.setState({ showOptionsBar: true });
    } else if (!hasScrollDown && showOptionsBar) {
      this.setState({ showOptionsBar: false });
    }
  }

  render() {
    const { backLinkProps } = this.props;
    const { showOptionsBar } = this.state;

    return (
      showOptionsBar && (
        <div key="options-bar" id="options-bar">
          { backLinkProps && <BackLink {...backLinkProps} /> }

          <p className="ml-auto" onClick={OptionsBar.handleGoUpClick}>Go Up</p>
        </div>
      )
    );
  }
}

export default OptionsBar;
