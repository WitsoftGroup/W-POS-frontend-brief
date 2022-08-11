import PropTypes from 'prop-types';

import usePermissions from './hooks/usePermissions';
import checkPermissions from './utils/checkPermissions';

const AccessControlGuard = ({
  children,
  allowedPermissions = [],
  renderNoAccess = () => {}
}) => {
  const userPermissions = usePermissions();

  const isPermitted = checkPermissions(allowedPermissions, userPermissions);

  if (!isPermitted) {
    return renderNoAccess();
  }

  return children;
};

AccessControlGuard.propTypes = {
  children: PropTypes.node.isRequired,
  allowedPermissions: PropTypes.arrayOf(PropTypes.string),
  renderNoAccess: PropTypes.func
};

export default AccessControlGuard;
