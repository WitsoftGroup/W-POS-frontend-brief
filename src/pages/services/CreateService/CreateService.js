import React, { useState } from 'react';

import { Card } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

import ScrollTabs from './components/ScrollTabs';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  width: '100%',
  padding: theme.spacing(3)
}));

const CreateService = () => {
  const [spaces, setSpaces] = useState([]);

  const handleAddSpace = () => {
    setSpaces([...spaces, {}]);
  };

  const handleSelectSpace = (space) => {};

  return (
    <>
      <ScrollTabs
        spaces={spaces}
        onAddSpace={handleAddSpace}
        onSelectSpace={handleSelectSpace}
      />
      {spaces?.length > 0 && <StyledCard>aqui va el contenido</StyledCard>}
    </>
  );
};

export default CreateService;
