import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Box, Card, Tooltip, IconButton, ButtonBase } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Add } from '@mui/icons-material';

const StyledRoot = styled(Box)(({ theme }) => ({
  height: 60,
  width: '100%',
  display: 'flex',
  borderRadius: 8,
  overflowX: 'scroll',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1, 0),
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  '& > *:not(:last-child)': {
    marginRight: theme.spacing(1)
  },
  [theme.breakpoints.up('md')]: {
    borderRadius: 16,
    marginBottom: theme.spacing(3)
  }
}));

const StyledCard = styled(Card)(({ selectedSpace, theme }) => ({
  maxWidth: 100,
  minWidth: 100,
  height: 50,
  minHeight: '100%',
  backgroundColor: selectedSpace && theme.palette.grey[200],
  borderColor: selectedSpace && theme.palette.primary.main
}));

const StyledButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`
}));

const ScrollTabs = ({ spaces = [], onAddSpace, onSelectSpace }) => {
  const [selectedSpace, setSelectedSpace] = useState(0);

  const handleAddService = () => onAddSpace && onAddSpace();

  const handleSelectService = (space, index) => {
    setSelectedSpace(index);
    return onSelectSpace && onSelectSpace(space);
  };

  return (
    <StyledRoot>
      {spaces.map((space, index) => (
        <ButtonBase
          key={index}
          onClick={() => handleSelectService(space, index)}
        >
          <StyledCard selectedSpace={index === selectedSpace} />
        </ButtonBase>
      ))}
      <Tooltip title="Agregar servicio" placement="top">
        <StyledButton onClick={handleAddService}>
          <Add color="primary" />
        </StyledButton>
      </Tooltip>
    </StyledRoot>
  );
};

ScrollTabs.propTypes = {
  spaces: PropTypes.array,
  onAddSpace: PropTypes.func,
  onSelectSpace: PropTypes.func
};

export default ScrollTabs;
