import React from 'react';

import PropTypes from 'prop-types';
// material
import { CircularProgress, Typography, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// custom styles ---------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 10,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.75)'
      : alpha(theme.palette.background.default, 0.8)
}));

// -----------------------------------------------------------

const LoadingWrapper = ({ text }) => (
  <RootStyle>
    <Box textAlign="center">
      <CircularProgress />
      <Typography mt={2} variant="subtitle1">
        {text || 'Cargando...'}
      </Typography>
    </Box>
  </RootStyle>
);

LoadingWrapper.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default LoadingWrapper;
