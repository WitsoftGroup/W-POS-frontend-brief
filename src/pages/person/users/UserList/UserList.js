import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  Grid,
  Button,
  Tooltip,
  IconButton,
  Typography
} from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Add, Visibility } from '@mui/icons-material';

import { fetchUsers } from 'redux/slices/person/user';
import Table from 'components/ui-components/Table';
import LoadingSpinner from 'components/ui-components/LoadingSpinner';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2)
}));

const UserList = () => {
  const {
    userList,
    userStates: { isFetchingUsers }
  } = useSelector((state) => state.person.user);

  const dispatch = useDispatch();

  const schema = [
    {
      columnName: 'firstName',
      columnLabel: 'Nombre'
    },
    {
      columnName: 'lastName',
      columnLabel: 'Apellido'
    },
    {
      columnName: 'documentNumber',
      columnLabel: 'Documento'
    },
    {
      columnName: 'email',
      columnLabel: 'Email'
    },
    {
      columnName: 'actions',
      columnLabel: '',
      columnProps: {
        align: 'center'
      },
      cellProps: {
        align: 'center',
        width: '10px'
      },
      render: () => (
        <Tooltip title="Ver detalles" placement="top">
          <IconButton>
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      {isFetchingUsers && <LoadingSpinner text="Cargando usuarios..." />}
      <Typography variant="h4" mb={2}>
        Lista de usuarios
      </Typography>
      <Box display="flex" justifyContent="end" mb={1}>
        <Button variant="contained">
          <Add />
          &nbsp;Agregar usuario
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <StyledCard>
            <Table
              hasCheckbox={false}
              cellSchema={schema}
              sourceData={userList.data}
            />
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={5}>
          <StyledCard>algo aqui</StyledCard>
        </Grid>
      </Grid>
    </>
  );
};

export default UserList;
