import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

import { forgotPassword } from 'redux/slices/auth';
import { PATH_AUTH } from 'routes/paths';
import LoadingWrapper from 'components/ui-components/LoadingSpinner';

import ForgotPasswordForm from './components/ForgotPasswordForm';

// custom styles -----------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(4, 3),
  margin: theme.spacing(0)
}));

// -------------------------------------------------

const ForgotPassword = () => {
  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const redirectToLogin = () => navigate(PATH_AUTH.login);

  const onSubmit = (data) => {
    dispatch(forgotPassword(data))
      .then(() => {
        enqueueSnackbar(
          'Te hemos enviado un link al correo electrónico que ingresaste',
          {
            variant: 'success',
            onClose: () => redirectToLogin()
          }
        );
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
      {isLoading && <LoadingWrapper text="Enviando..." />}
      <Container>
        <ContentStyle>
          <CardStyle>
            <Box mb={2}>
              <Typography align="center" variant="h4">
                Recuperar contraseña
              </Typography>
            </Box>
            <Box mb={4}>
              <Typography variant="p">
                Te enviaremos un link de recuperación por e-mail
              </Typography>
            </Box>
            <ForgotPasswordForm onSubmit={onSubmit} />
          </CardStyle>
        </ContentStyle>
      </Container>
    </>
  );
};

export default ForgotPassword;
