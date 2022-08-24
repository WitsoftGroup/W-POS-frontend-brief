import React, { useState } from 'react';

import {
  Box,
  Grid,
  Tooltip,
  IconButton,
  ListItem,
  Button
} from '@mui/material';
import { FilterList, Search, Clear } from '@mui/icons-material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import SelectInput from 'components/ui-components/form/SelectInput';
import TextInput from 'components/ui-components/form/TextInput';
import NumberInput from 'components/ui-components/form/NumberInput';
import { userStatus } from 'utils/options';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    marginRight: theme.spacing(1)
  }
}));

const UserFilters = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleToggle = () => setOpen(!open);

  return (
    <Box display="flex">
      <Tooltip
        title={open ? 'Ocultar filtros' : 'Mostrar filtros'}
        placement="top"
      >
        <IconButton onClick={handleToggle}>
          <FilterList color={open ? 'primary' : 'inherit'} />
        </IconButton>
      </Tooltip>
      {open && (
        <>
          <Box display="flex" ml={4}>
            <TextInput label="Nombre(s)" className={classes.inputRoot} />
            <NumberInput
              prefix=""
              label="Documento"
              className={classes.inputRoot}
            />
            <SelectInput
              label="Status"
              defaultValue="0"
              options={userStatus}
              className={classes.inputRoot}
            >
              <ListItem value="0">Todos</ListItem>
            </SelectInput>
          </Box>
          <Tooltip title="Buscar" placement="top">
            <IconButton
              onClick={handleToggle}
              color="primary"
              sx={{ width: 40 }}
            >
              <Search fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Limpiar filtros" placement="top">
            <IconButton variant="outlined" color="error" sx={{ width: 40 }}>
              <Clear fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default UserFilters;
