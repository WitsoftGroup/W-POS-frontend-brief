const path = (root, subpath) => `${root}${subpath}`;

const ROOT_AUTH = '/auth';
const ROOT_HOME = '/inicio';
const ROOT_PERSON = '/personas';
const ROOT_PROFILE = '/perfil';
const ROOT_SERVICE = '/servicios';

export const PATH_AUTH = {
  root: ROOT_AUTH,
  login: path(ROOT_AUTH, '/login'),
  forgotPassword: path(ROOT_AUTH, '/forgot-password'),
  changePassword: path(ROOT_AUTH, '/reset-password/:token')
};

export const PATH_HOME = {
  root: ROOT_HOME
};

export const PATH_SERVICE = {
  root: ROOT_SERVICE,
  new: path(ROOT_SERVICE, '/nuevo'),
  list: path(ROOT_SERVICE, '/lista')
};

export const PATH_PERSON = {
  root: ROOT_PERSON,
  users: path(ROOT_PERSON, '/usuarios')
};

export const PATH_PROFILE = {
  root: ROOT_PROFILE
};
