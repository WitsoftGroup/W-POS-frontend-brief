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
import { Add, Edit, Delete } from '@mui/icons-material';

import { fetchUsers, setUserList } from 'redux/slices/person/user';
import Table from 'components/ui-components/Table';
import LoadingSpinner from 'components/ui-components/LoadingSpinner';
import { userStatus } from 'utils/options';

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
      render: () => (
        <Box display="flex">
          <Tooltip title="Editar usuario" placement="top">
            <IconButton>
              <Edit color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar usuario" placement="top">
            <IconButton>
              <Delete color="warning" />
            </IconButton>
          </Tooltip>
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
      <Box display="flex" justifyContent="end" mb={1}>
        <Button variant="contained">
          <Add />
          &nbsp;Agregar usuario
        </Button>
      </Box>
      <StyledCard>
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
