import React, { useState } from 'react';

import { Card, Tab, Tabs } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

import ScrollTabs from './components/ScrollTabs';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  width: '100%',
  padding: theme.spacing(3)
}));

const CreateService = () => {
  const [spaces, setSpaces] = useState([]);

  const [currentTab, setCurrentTab] = useState('clientData');

  const handleAddSpace = () => {
    setSpaces([...spaces, {}]);
  };

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSelectSpace = (space) => {};

  const renderTabContent = () => {
    if (currentTab === 'clientData') {
      return <div>Data Client</div>;
    }
    if (currentTab === 'serviceData') {
      return <div>Data Service</div>;
    }
    if (currentTab === 'payment') {
      return <div>Payment</div>;
    }
  };

  return (
    <>
      <ScrollTabs
        spaces={spaces}
        onAddSpace={handleAddSpace}
        onSelectSpace={handleSelectSpace}
      />
      {spaces?.length > 0 && (
        <StyledCard>
          <Tabs value={currentTab} onChange={handleChange}>
            <Tab label="Datos de cliente" value="clientData" />
            <Tab label="Datos del servicio" value="serviceData" />
            <Tab label="Pagos/abonos" value="payment" />
          </Tabs>
          {renderTabContent()}
        </StyledCard>
      )}
    </>
  );
};

export default CreateService;
