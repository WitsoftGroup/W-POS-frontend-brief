import PropTypes from 'prop-types';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// material
import { Container } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
//
import NavbarLayout from './NavbarLayout';
import DashboardSidebar from './DashboardSidebar';
import LoadingPage from '../../pages/LoadingPage';
import ScrollBar from '../../components/ScrollBar';
// constants
import { LAYOUT } from '../../utils/constants';

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

  const { isLoading } = useSelector((state) => state.common);

  return (
    <RootStyle>
      <NavbarLayout onOpenSidebar={() => setOpen(true)} />
      {isLoading && <LoadingPage />}
      <DashboardSidebar
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
