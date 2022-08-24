import React, { useState } from 'react';
// prop types
import PropTypes from 'prop-types';
// router
import { Link as RouterLInk } from 'react-router-dom';
// material
import {
  InputAdornment,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// yup
import * as Yup from 'yup';
// paths
import { PATH_AUTH } from 'routes/paths';
import NumberInput from 'components/ui-components/form/NumberInput';
import TextInput from 'components/ui-components/form/TextInput';

const LoginForm = ({ remember, documentNumber, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Por favor digite su contraseña'),
    documentNumber: Yup.string().required('Por favor digite su documento')
  });

  const formik = useFormik({
    initialValues: {
      remember,
      password: '',
      documentNumber: documentNumber || ''
    },
    validationSchema: LoginSchema,
    onSubmit: (data, formikHelpers) => onSubmit(data, formikHelpers)
  });

  const { errors, values, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <NumberInput
          fullWidth
          prefix=""
          size="small"
          name="documentNumber"
          label="Cédula"
          placeholder="Digite su cédula"
          {...getFieldProps('documentNumber')}
          error={errors.documentNumber}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            )
          }}
          formControlProps={{
            sx: { marginBottom: 3 }
          }}
        />
        {/* <TextField
          fullWidth
          name="email"
          type="email"
          label="E-mail"
          placeholder="Digite su e-mail"
          {...getFieldProps('email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          sx={{ marginBottom: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            )
          }}
        /> */}
        <TextInput
          name="password"
          label="Contraseña"
          placeholder="Digite su contraseña"
          type={showPassword ? 'text' : 'password'}
          {...getFieldProps('password')}
          error={errors.password}
          formControlProps={{
            sx: { marginBottom: 1 }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            )
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps('remember')}
                checked={values.remember}
              />
            }
            label="Recordar mi cédula"
          />
          <Link to={PATH_AUTH.forgotPassword} component={RouterLInk}>
            Olvidé mi contraseña
          </Link>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            type="primary"
            sx={{ marginTop: 3, px: 5 }}
          >
            Entrar
          </Button>
        </Box>
      </Form>
    </FormikProvider>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string,
  remember: PropTypes.bool,
  password: PropTypes.string,
  documentNumber: PropTypes.string,
  onSubmit: PropTypes.func
};

export default LoginForm;
