import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Card, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

import LoadingSpinner from 'components/ui-components/LoadingSpinner';
import { login, setRemember } from 'redux/slices/auth';
import { getErrorObject } from 'utils/error';

import LoginForm from './components/LoginForm';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
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

// ----------------------------------------------------------------------

const Login = () => {
  const { user, remember, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data, { setErrors }) => {
    const { password, remember: changedRemember, documentNumber } = data;
    dispatch(setRemember(changedRemember));
    dispatch(
      login({
        password,
        documentNumber: documentNumber.replace('.', '')
      })
    )
      .then(() => {
        enqueueSnackbar('Bienvenido!', {
          variant: 'success'
        });
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
        return error.errors && setErrors(getErrorObject(error.errors));
      });
  };

  return (
    <>
      {isLoading && <LoadingSpinner text="Entrando..." />}
      <Container>
        <ContentStyle>
          <CardStyle>
            <Box mb={4}>
              <Typography align="center" variant="h4">
                Accesar
              </Typography>
            </Box>
            <LoginForm
              {...(remember && {
                ...user,
                documentNumber: user?.documentNumber?.toString()
              })}
              remember={remember}
              onSubmit={onSubmit}
            />
          </CardStyle>
        </ContentStyle>
      </Container>
    </>
  );
};

export default Login;
