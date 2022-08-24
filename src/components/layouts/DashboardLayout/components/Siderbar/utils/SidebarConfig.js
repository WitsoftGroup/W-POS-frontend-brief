import {
  Home,
  People,
  AccountBox,
  MiscellaneousServices
} from '@mui/icons-material';

// paths
import {
  PATH_HOME,
  PATH_PERSON,
  PATH_PROFILE,
  PATH_SERVICE
} from 'routes/paths';

// ----------------------------------------------------------------------

const ICONS = {
  home: <Home />,
  person: <People />,
  profile: <AccountBox />,
  services: <MiscellaneousServices />
};

const sidebarConfig = [
  {
    items: [
      {
        title: 'Dashboard',
        icon: ICONS.home,
        href: PATH_HOME.root
      },
      {
        title: 'Servicios',
        icon: ICONS.services,
        href: PATH_SERVICE.root,
        items: [
          {
            title: 'Nuevo servicio',
            href: PATH_SERVICE.new
          }
        ]
      },
      {
        title: 'Personas',
        icon: ICONS.person,
        href: PATH_PERSON.root,
        items: [
          {
            title: 'Usuarios',
            href: PATH_PERSON.users
          }
        ]
      },
      {
        title: 'Mi perfil',
        icon: ICONS.profile,
        href: PATH_PROFILE.root
      }
    ]
  }
];

export default sidebarConfig;
