import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

 /* {
    title: 'Admin Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },*/
  {
    title: 'Definitions',
    group: true,
  },

 /* {
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
  */
  {
    title: 'Compounds',
    icon: 'edit-2-outline',
    children: [
      {

        title: 'Foxboro DCS',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 1},
        home: true
      },
      {
        title: 'Tricon',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 2}
      },
      {
        title: 'Tricon CX',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 3}
      },
      {
        title: 'Trident',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 4}
      },
      {
        title: 'Tri-GP',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 5}
      },
      {
        title: 'IT ',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 6}
      },
      {
        title: 'DCS(BASF)',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 7}
      },
      {
        title: 'Tri-Com',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 8}
      },
      {
        title: 'Modicon',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 9}
      },
      {
        title: 'DCS(FBS-S)',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 10}
      },
      {
        title: 'DCS(FBM-C)',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 11}
      },
      {
        title: 'PES',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 16}
      },
      {
        title: 'M&I',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 18}
      },
      {
        title: 'HDCS',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 19}
      },
      {
        title: 'SCADA',
        link: '/pages/compounds/compound-hierarchy',
        queryParams: {platformId: 20}
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
        queryParams: {platformId: 1}
      },
      {
        title: 'Tricon',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 2}
      },
      {
        title: 'Tricon CX',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 3}
      },
      {
        title: 'Trident',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 4}
      },
      {
        title: 'Tri-GP',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 5}
      },
      {
        title: 'IT ',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 6}
      },
      {
        title: 'DCS(BASF)',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 7}
      },
      {
        title: 'Tri-Com',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 8}
      },
      {
        title: 'Modicon',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 9}
      },
      {
        title: 'DCS(FBS-S)',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 10}
      },
      {
        title: 'DCS(FBM-C)',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 11}
      },
      {
        title: 'PES',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 16}
      },
      {
        title: 'M&I',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 18}
      },
      {
        title: 'HDCS',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 19}
      },
      {
        title: 'SCADA',
        link: '/pages/products/ProductCategoryList',
        queryParams: {platformId: 20}
      },
    ],
  },
  /*
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
  */

];
