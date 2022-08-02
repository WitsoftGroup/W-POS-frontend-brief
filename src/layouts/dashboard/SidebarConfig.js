import { Home } from '@mui/icons-material';

// ----------------------------------------------------------------------

const ICONS = {
  home: <Home />
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
        title: 'Users',
        icon: ICONS.home,
        href: '/user',
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
