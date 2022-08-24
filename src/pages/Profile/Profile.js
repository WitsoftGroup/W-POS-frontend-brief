import React, { useState } from 'react';

import { Tab, Tabs, Card } from '@mui/material';
import { AccountBox, Settings, Key } from '@mui/icons-material';
import { experimentalStyled as styled } from '@mui/material/styles';

import UpdatePassword from './components/UpdatePassword';

const CardStyled = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    width: '50%'
  }
}));

const Profile = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event, value) => {
    setCurrentTab(value);
  };

  const getTabContent = (tab) => {
    if (tab === 0) return 'mis datos';
    if (tab === 1) return <UpdatePassword />;
    if (tab === 2) return 'configuraciones';
    return null;
  };

  return (
    <>
      <Tabs
        value={currentTab}
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
        aria-label="icon label tabs example"
      >
        <Tab icon={<AccountBox />} label="Mis datos" />
        <Tab icon={<Key />} label="Cambiar contraseña" />
        <Tab icon={<Settings />} label="Configuraciones" />
      </Tabs>
      <CardStyled>{getTabContent(currentTab)}</CardStyled>
    </>
  );
};

export default Profile;
