import React from 'react';

import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PATH_HOME } from 'routes/paths';

const LoggedGuard = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate replace to={PATH_HOME.root} />;
  }

  return children;
};

LoggedGuard.propTypes = {
  children: PropTypes.node
};

export default LoggedGuard;
