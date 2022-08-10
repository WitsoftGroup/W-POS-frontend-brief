import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@mui/material/styles';
import {
  Box,
  Link,
  List,
  Button,
  Drawer,
  Avatar,
  Hidden,
  Typography,
  ListSubheader
} from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/auth';
// components
import { ScrollBar } from '../../components';
//
import MenuLinks from './SidebarConfig';
import SidebarItem from './SidebarItem';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper
  },
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  margin: theme.spacing(1, 2.5, 5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

const reduceChild = ({ array, item, pathname, level }) => {
  const key = item.href + level;

  if (item.items) {
    const match = pathname.match(item.href);

    return [
      ...array,
      <SidebarItem
        key={key}
        level={level}
        icon={item.icon}
        info={item.info}
        href={item.href}
        title={item.title}
        open={Boolean(match)}
      >
        {renderSidebarItems({
          pathname,
          level: level + 1,
          items: item.items
        })}
      </SidebarItem>
    ];
  }
  return [
    ...array,
    <SidebarItem
      key={key}
      level={level}
      href={item.href}
      icon={item.icon}
      info={item.info}
      title={item.title}
    />
  ];
};

const renderSidebarItems = ({ items, pathname, level = 0 }) => (
  <List disablePadding>
    {items.reduce(
      (array, item) => reduceChild({ array, item, pathname, level }),
      []
    )}
  </List>
);

const DashboardSidebar = ({ isOpenSidebar, onCloseSidebar }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(logout());

  useEffect(() => {
    if (isOpenSidebar && onCloseSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <ScrollBar>
      <Box sx={{ px: 2.5, py: 3 }}>
        <RouterLink to="/">Logo</RouterLink>
      </Box>

      <Link underline="none" component={RouterLink} to="/">
        <AccountStyle>
          <Avatar />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              Hola!
            </Typography>
            <Typography variant="body1">
              {user?.firstName} {user?.lastName}
            </Typography>
          </Box>
        </AccountStyle>
      </Link>

      {MenuLinks.map((list) => (
        <List
          disablePadding
          key={list.subheader}
          subheader={
            <ListSubheader
              disableSticky
              disableGutters
              sx={{
                mt: 3,
                mb: 2,
                pl: 5,
                color: 'text.primary',
                typography: 'overline'
              }}
            >
              {list.subheader}
            </ListSubheader>
          }
        >
          {renderSidebarItems({
            items: list.items,
            pathname
          })}
        </List>
      ))}

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Button fullWidth variant="outlined" onClick={handleLogout}>
          Salir
        </Button>
      </Box>
    </ScrollBar>
  );

  return (
    <RootStyle>
      <Hidden lgUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' }
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
};

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default DashboardSidebar;
