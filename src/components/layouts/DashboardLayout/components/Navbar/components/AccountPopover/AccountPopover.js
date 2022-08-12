import React, { useState } from 'react';

import PropTypes from 'prop-types';
import {
  IconButton,
  Avatar,
  Popover,
  Box,
  Typography,
  Button
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// custom styles--------------------------------------------------------

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 38,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`
  }
}));

// ----------------------------------------------------------------------

const AccountPopover = ({ user = {}, onExit }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExit = () => onExit && onExit();

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar />
      </IconButton>

      <Popover
        keepMounted
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 8,
            overflow: 'inherit',
            boxShadow: (theme) => theme.customShadows.z20,
            border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
            width: 200,
            backgroundImage: 'none'
          }
        }}
      >
        <ArrowStyle />
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user.firstName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleExit}
          >
            Salir
          </Button>
        </Box>
      </Popover>
    </>
  );
};

AccountPopover.propTypes = {
  user: PropTypes.object,
  onExit: PropTypes.func
};

export default AccountPopover;
