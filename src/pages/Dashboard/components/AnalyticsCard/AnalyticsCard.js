import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { alpha, experimentalStyled as styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import { MonetizationOn } from '@mui/icons-material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme, color }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color:
    theme.palette.mode === 'light'
      ? theme.palette[color].darker
      : theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper
}));

const IconWrapperStyle = styled('div')(({ theme, color: colorParam }) => {
  const color =
    theme.palette.mode === 'light'
      ? theme.palette[colorParam].darker
      : theme.palette.text.primary;
  return {
    color,
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    backgroundImage: `linear-gradient(135deg, ${alpha(color, 0)} 0%, ${alpha(
      color,
      0.24
    )} 100%)`
  };
});

// ----------------------------------------------------------------------

const AnalyticsBugReports = ({ color = 'primary', icon, children }) => (
  <RootStyle color={color}>
    <IconWrapperStyle color={color}>
      {icon || <MonetizationOn width={24} height={24} />}
    </IconWrapperStyle>
    {children}
  </RootStyle>
);

AnalyticsBugReports.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success'
  ]),
  icon: PropTypes.element,
  children: PropTypes.node
};

export default AnalyticsBugReports;
