import { ROLE } from '@app/auth';
import { PERMISSIONS } from '../../auth/enums/permissions.enum';
import { NavMenuItem } from '@core/interfaces';

// THIS FILE CONTAINS THE NAVIGATION MENU ITEMS FOR THE SIDEBAR AND ALL OTHER NAVIGATION MENUS WHICH ARE USED IN THE APPLICATION AND ARE CONSTANT

/**
 * Navigation menu items for WEB Sidebar
 */
export const webSidebarMenuItems: NavMenuItem[] = [
  {
    href: '/dashboard',
    title: 'Dashboard',
    active: true,
    icon: 'fa-home',
  },
  {
    href: '/systems',
    title: 'Systems',
    active: false,
    icon: 'fa-users',
    permissions: [PERMISSIONS.ACCESS_SYSTEMS, ROLE.ADMIN],
  },
  {
    href: '/trades',
    title: 'Trades',
    active: false,
    icon: 'fa-money-bill-alt',
    permissions: [PERMISSIONS.ACCESS_TRADES],
  },
  {
    href: '/products',
    title: 'Products',
    active: false,
    icon: 'fa-box',
    permissions: [PERMISSIONS.ACCESS_PRODUCTS],
    subItems: [
      {
        href: '/product-categories',
        title: 'Product Categories',
        active: false,
      },
      {
        href: '/product-types',
        title: 'Product Types',
        active: false,
      },
      {
        href: '/product-attributes',
        title: 'Product Attributes',
        active: false,
      },
    ],
  },
  {
    href: '/settings',
    title: 'Settings',
    active: false,
    icon: 'fa-cog',
    divider: true,
    permissions: [PERMISSIONS.ACCESS_SETTINGS],
  },
];
