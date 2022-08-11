import React from 'react';

import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { PATH_AUTH } from 'routes/paths';

const UserGuard = ({ children }) => {
  const userType = 'NEED_UPDATE_PASSWORD'; // TODO: esto deve venir del state global dinamicamente

  if (userType === 'NEED_UPDATE_PASSWORD') {
    return <Navigate replace to={PATH_AUTH.changePassword} />;
  }

  return children;
};

UserGuard.propTypes = {
  children: PropTypes.node
};

export default UserGuard;
