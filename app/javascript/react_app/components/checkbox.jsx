import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.componentIsMounted = false;

    this.state = {
      animateClass: false,
    };
    this.removeAnimateClass = this.removeAnimateClass.bind(this);
  }

  componentDidMount() {
    this.componentIsMounted = true;
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
    this.componentIsMounted = false;
  }

  animate() {
    this.setState({ animateClass: true });
  }

  async removeAnimateClass() {
    await setTimeout(() => {
      if (this.componentIsMounted) {
        this.setState({ animateClass: false });
      }
    }, 700);
  }

  // eslint-disable-next-line class-methods-use-this
  changeHandler() {
    return false;
  }

  render() {
    const { checked, onClick } = this.props;
    let classes = 'checkbox-input';
    classes += (this.state.animateClass) ? ' animate' : '';

    const props = {
      type: 'checkbox',
      className: classes,
      onClick,
      onChange: this.changeHandler,
      checked,
    };

    return <input {...props} />;
  }
}

export default Checkbox;
