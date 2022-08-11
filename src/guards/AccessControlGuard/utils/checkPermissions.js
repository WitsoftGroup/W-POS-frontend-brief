export default (allowedPermissions, userPermissions) => {
  if (!allowedPermissions || !userPermissions) {
    return false;
  }

  return allowedPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};
