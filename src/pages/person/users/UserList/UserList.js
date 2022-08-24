import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  Chip,
  Button,
  Tooltip,
  IconButton,
  Typography
} from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Add, EditOutlined, DeleteOutline, Upgrade } from '@mui/icons-material';

import { fetchUsers, setUserList } from 'redux/slices/person/user';
import Table from 'components/ui-components/Table';
import LoadingSpinner from 'components/ui-components/LoadingSpinner';
import { userStatus } from 'utils/options';

import UserFilters from './components/UserFilters';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2)
}));

const UserList = () => {
  const {
    userList: { data: users, limit, skip, total },
    userStates: { isFetchingUsers, filters }
  } = useSelector((state) => state.person.user);

  const dispatch = useDispatch();

  const schema = [
    {
      columnName: 'firstName',
      columnLabel: 'Nombre(s)'
    },
    {
      columnName: 'lastName',
      columnLabel: 'Apellido(s)'
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
      columnName: 'status',
      columnLabel: 'Status',
      columnProps: {
        align: 'center'
      },
      cellProps: {
        align: 'center'
      },
      render: (_, data) => {
        const status = userStatus.find(
          (option) => option.value === data.user?.status
        );
        return (
          status && (
            <Chip
              variant="outlined"
              label={status.label}
              color={status.color}
            />
          )
        );
      }
    },
    {
      columnName: 'actions',
      columnLabel: 'Acciones',
      columnProps: {
        align: 'center'
      },
      cellProps: {
        align: 'center',
        width: '10px'
      },
      render: (_, data) => (
        <Box display="flex" justifyContent="center">
          <Tooltip title="Editar usuario" placement="top">
            <IconButton>
              <EditOutlined color="primary" />
            </IconButton>
          </Tooltip>
          {data.user?.status !== 'INACTIVE' ? (
            <Tooltip title="Eliminar usuario" placement="top">
              <IconButton>
                <DeleteOutline color="error" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Activar usuario" placement="top">
              <IconButton>
                <Upgrade color="success" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )
    }
  ];

  const handleChangePage = (newPage) => {
    dispatch(setUserList({ skip: newPage * limit }));
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    dispatch(setUserList({ limit: newRowsPerPage }));
  };

  useEffect(() => {
    dispatch(fetchUsers({ skip, limit, ...filters }));
  }, [dispatch, skip, limit, filters]);

  return (
    <>
      {isFetchingUsers && <LoadingSpinner text="Cargando usuarios..." />}
      <Typography variant="h4" mb={2}>
        Lista de usuarios
      </Typography>
      <StyledCard>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <UserFilters />
          <Button variant="contained">
            <Add />
            &nbsp;Agregar usuario
          </Button>
        </Box>
        <Table
          hasCheckbox={false}
          cellSchema={schema}
          count={total}
          rowsPerPage={limit}
          page={skip / limit}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          sourceData={users}
        />
      </StyledCard>
    </>
  );
};

export default UserList;
