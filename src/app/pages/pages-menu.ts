import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Admin Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Definitions',
    group: true,
  },

  {
    title: 'Forms',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
        home : true,
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'Compounds',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Foxboro DCS',
        link: '/pages/compounds/compound-hierarchy',
      },
    ],
  },

  {
    title: 'Products',
    icon : 'grid-outline',
    children: [
      {
        title: 'Foxboro DCS',
        link: '/pages/products/ProductCategoryList',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  }

];
