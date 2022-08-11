import React from 'react';

import PropTypes from 'prop-types';

import AuthGuard from '../AuthGuard';
import UserGuard from '../UserGuard';

const AuthStatusGuard = ({ children }) => (
  <AuthGuard>
    <UserGuard>{children}</UserGuard>
  </AuthGuard>
);

AuthStatusGuard.propTypes = {
  children: PropTypes.node
};

export default AuthStatusGuard;
