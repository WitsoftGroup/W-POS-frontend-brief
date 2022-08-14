import { Home, People, AccountBox } from '@mui/icons-material';
// paths
import { PATH_HOME, PATH_PERSON, PATH_PROFILE } from 'routes/paths';

// ----------------------------------------------------------------------

const ICONS = {
  home: <Home />,
  person: <People />,
  profile: <AccountBox />
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
