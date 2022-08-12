import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  AppBar,
  Hidden,
  Toolbar,
  IconButton,
  Switch,
  Breadcrumbs,
  Typography
} from '@mui/material';
import { Menu, Brightness4, BrightnessHigh } from '@mui/icons-material';
import { alpha, experimentalStyled as styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

import { logout } from 'redux/slices/auth';
import { useSettings } from 'hooks';
import { LAYOUT } from 'utils/constants';
import Modal from 'components/ui-components/Modal';

import AccountPopover from './components/AccountPopover';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background.default, 0.95),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${LAYOUT.DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: LAYOUT.APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: LAYOUT.APPBAR_DESKTOP,
    padding: theme.spacing(0, 3)
  }
}));

// ----------------------------------------------------------------------

const DashboardNavbar = ({ onOpenSidebar }) => {
  const [openModal, setOpenModal] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { themeMode, toggleMode } = useSettings();
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      enqueueSnackbar('Vuelve pronto!', {
        variant: 'success'
      });
    });
  };

  const handleExit = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  return (
    <RootStyle>
      <Modal
        open={openModal}
        title="Deseas salir del sistema?"
        okButtonText="Salir"
        onOk={handleLogout}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
      />
      <ToolbarStyle>
        <Hidden lgUp>
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            <Menu />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <Breadcrumbs aria-label="breadcrumb" sx={{ ml: 2 }}>
            {pathname.split('/').map((item, index, arr) => (
              <Typography
                key={index}
                variant="h6"
                textTransform="capitalize"
                fontWeight={
                  arr.length - 1 === index
                    ? 'fontWeightBold'
                    : 'fontWeightRegular'
                }
              >
                {item}
              </Typography>
            ))}
          </Breadcrumbs>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <Box px={4} sx={{ display: 'flex', alignItems: 'center' }}>
          {themeMode === 'light' ? (
            <Brightness4 color="primary" />
          ) : (
            <BrightnessHigh color="primary" />
          )}
          <Switch checked={!(themeMode === 'light')} onChange={toggleMode} />
        </Box>
        <Box>
          <AccountPopover user={user} onExit={handleExit} />
        </Box>
      </ToolbarStyle>
    </RootStyle>
  );
};

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default DashboardNavbar;
