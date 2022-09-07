import React from 'react';

import { Box, Card, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

const CardStyled = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2)
}));

const ServiceList = () => {
  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Lista de Servicios
      </Typography>
      <CardStyled>ServiceList</CardStyled>
    </Box>
  );
};

export default ServiceList;
