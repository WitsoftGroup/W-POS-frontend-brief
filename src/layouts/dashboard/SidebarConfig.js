import { Home, People } from '@mui/icons-material';

// ----------------------------------------------------------------------

const ICONS = {
  home: <Home />,
  person: <People />
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'Dashboard',
        icon: ICONS.home,
        href: '/home',
        items: [
          {
            title: 'profile',
            href: '/home/profile'
          },
          {
            title: 'cards',
            href: '/home/cards'
          },
          {
            title: 'list',
            href: '/home/list'
          },
          {
            title: 'account',
            href: '/home/account'
          }
        ]
      },
      {
        title: 'Personas',
        icon: ICONS.person,
        href: '/person',
        items: [
          {
            title: 'account',
            href: '/user/account'
          }
        ]
      }
    ]
  }
];

export default sidebarConfig;
