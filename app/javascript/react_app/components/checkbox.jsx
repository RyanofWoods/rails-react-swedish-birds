/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      animateClass: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentDidUpdate(prevProps, prevState) {
    // checked false -> true
    if (!prevProps.checked && this.props.checked) {
      this.animate();
    }
    // animateClass false -> true
    if (!prevState.animateClass && this.state.animateClass) {
      this.removeAnimateClass();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  animate() {
    this.setState({ animateClass: true });
  }

  removeAnimateClass = async () => {
    await setTimeout(() => {
      if (this._isMounted) {
        this.setState({ animateClass: false });
      }
    }, 700);
  }

  changeHandler() {
    return false;
  }

  render() {
    const { checked, onClick } = this.props;
    let classes = "checkbox-input";
    classes += (this.state.animateClass) ? ' animate' : '';

    const props = {
      type: "checkbox",
      className: classes,
      onClick,
      onChange: this.changeHandler,
      checked,
    };

    return <input {...props}/>
  }
}

export default Checkbox;
