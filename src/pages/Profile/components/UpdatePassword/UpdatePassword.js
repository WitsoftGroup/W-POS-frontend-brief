import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { updatePassword, logout } from 'redux/slices/auth';
import LoadingSpinner from 'components/ui-components/LoadingSpinner';

import ChangePasswordForm from './components/ChangePasswordForm';

// ----------------------------------------------------------------------

const UpdatePassword = () => {
  const {
    isLoading,
    user: { documentNumber, email }
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    dispatch(
      updatePassword({
        documentNumber,
        email,
        ...data
      })
    )
      .then(() => {
        enqueueSnackbar(
          'La contraseña ha sido restablecida con éxito! Por favor ingresa nuevamente',
          {
            variant: 'success'
          }
        );
        dispatch(logout());
      })
      .catch(({ response: { data: error } }) => {
        enqueueSnackbar(
          error
            ? error.message
            : 'Error inesperado, por favor intente nuevamente',
          {
            variant: 'error'
          }
        );
      });
  };

  return (
    <>
      {isLoading && <LoadingSpinner text="Cambiando contraseña..." />}
      <Typography variant="body1" mb={3}>
        Cambiar la contraseña es fácil y rápido!
      </Typography>
      <ChangePasswordForm buttonFullWidth={false} onSubmit={onSubmit} />
    </>
  );
};

export default UpdatePassword;
