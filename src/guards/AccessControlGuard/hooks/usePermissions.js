import { useSelector } from 'react-redux';

const usePermissions = () => {
  const { user } = useSelector((state) => state.auth);

  const allPermissions = [];

  if (user?.roles?.length) {
    user.roles.forEach((role) => {
      if (role.permissions?.length) {
        role.permissions.forEach((permission) => {
          allPermissions.push(permission);
        });
      }
    });
  }

  return allPermissions;
};

export default usePermissions;
