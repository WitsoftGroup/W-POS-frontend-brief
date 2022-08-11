import { useState } from 'react';

import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

import ScrollBar from 'components/ui-components/ScrollBar';
import { LAYOUT } from 'utils/constants';

import SidebarLayout from './components/Siderbar';
import NavbarLayout from './components/Navbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: LAYOUT.APPBAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: LAYOUT.APPBAR_DESKTOP + 24,
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0)
  }
}));

// ----------------------------------------------------------------------

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <NavbarLayout onOpenSidebar={() => setOpen(true)} />
      <SidebarLayout
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <Container maxWidth="xl">
        <ScrollBar>
          <MainStyle>{children || <Outlet />}</MainStyle>
        </ScrollBar>
      </Container>
    </RootStyle>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};

export default DashboardLayout;
