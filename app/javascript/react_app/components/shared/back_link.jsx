import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from 'react-redux';

const BackLink = (props) => {
  const goTo = props.to ? props.to : useStore().getState().prevLocation;

  return <Link to={goTo}>Go Back</Link>;
};

export default BackLink;
