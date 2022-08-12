import React from 'react';

import PropTypes from 'prop-types';
import {
  Box,
  Zoom,
  Dialog,
  Button,
  IconButton,
  DialogContent,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close } from '@mui/icons-material';

const Transition = React.forwardRef((props, ref) => (
  <Zoom ref={ref} {...props} />
));

// --------------------------------------------------

const RootStyle = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-rounded': {
    overflowY: 'inherit',
    borderRadius: 20,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  }
}));

const StyledModalContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&.MuiPaper-rounded': {
    borderRadius: 0
  }
}));

const StyledButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  rowGap: theme.spacing(2),
  marginTop: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    rowGap: theme.spacing(0)
  }
}));

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'transparent',
  [theme.breakpoints.up('sm')]: {
    top: theme.spacing(-2.5),
    right: theme.spacing(-2.5),
    backgroundColor: theme.palette.grey[300],
    '&:hover': {
      backgroundColor: theme.palette.grey[400]
    }
  }
}));

// --------------------------------------------------

const Modal = ({
  text,
  title,
  children,
  open = false,
  hasCloseButton = true,
  okButtonText = 'Aceptar',
  hasActionButtons = true,
  cancelButtonText = 'Cancelar',
  onOk,
  onClose,
  onCancel,
  ...props
}) => {
  const handleOk = () => onOk && onOk();
  const handleClose = () => onClose && onClose();
  const handleCancel = () => onCancel && onCancel();
  return (
    <RootStyle
      open={open}
      maxWidth="md"
      TransitionComponent={Transition}
      onClose={handleClose}
      {...props}
    >
      {hasCloseButton && (
        <StyledCloseButton onClick={handleClose}>
          <Close />
        </StyledCloseButton>
      )}
      <StyledModalContent>
        {title && (
          <Typography variant="h6" mt={2}>
            {title}
          </Typography>
        )}
        {text && (
          <Typography variant="body1" mt={3}>
            {text}
          </Typography>
        )}
        {children && children}
        {hasActionButtons && (
          <StyledButtonContainer>
            <Button variant="outlined" onClick={handleCancel}>
              {cancelButtonText}
            </Button>
            <Button variant="contained" onClick={handleOk}>
              {okButtonText}
            </Button>
          </StyledButtonContainer>
        )}
      </StyledModalContent>
    </RootStyle>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  text: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  hasCloseButton: PropTypes.bool,
  hasActionButtons: PropTypes.bool,
  okButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  onClose: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default Modal;
