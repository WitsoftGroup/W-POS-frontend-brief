import React from 'react';

import { Box, Typography } from '@mui/material';

import logo from 'assets/logo/logo-witsoft.png';

const PoweredBy = () => (
  <Box px={3} py={1}>
    <Typography
      variant="body1"
      textAlign="center"
      color={(theme) => theme.palette.text.disabled}
    >
      Powered by
    </Typography>
    <Box display="flex" alignItems="center" justifyContent="center">
      <img src={logo} alt="Witsoft Group" width={20} />
      <Typography variant="subtitle1" component="span" ml={1}>
        Witsoft Group
      </Typography>
    </Box>
  </Box>
);

export default PoweredBy;
