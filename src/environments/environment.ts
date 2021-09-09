/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  addProduct : "https://localhost:44375/api/Definitions/addproduct",
  getProductList : 'https://localhost:44375/api/Definitions/getproducts_producthierarchy',
  getProduct: 'https://localhost:44375/api/Definitions/getproduct',
  updateProduct: 'https://localhost:44375/api/Definitions/updateProduct',
  getProductCategories: 'https://localhost:44375/api/Definitions/getproductcategories_producthierarchy',
  getCompoundCategories: 'https://localhost:44375/api/Definitions/getcompoundcategories_compoundhierarchy',
  getProductsByCompoundMember: 'https://localhost:44375/api/Definitions/getproductsbycompoundmember_compoundhierarchy',
  getAllProducts: 'https://localhost:44375/api/Definitions/getallproductsforassignment',
  assignProductsToCompoundMember: 'https://localhost:44375/api/Definitions/assignproductstocompoundmember',
  getCompoundMembers: 'https://localhost:44375/api/Definitions/getcompoundmembers_compoundhierarchy',
  getCompoundMemberNames: 'https://localhost:44375/api/Definitions/getcompoundmembernames',
  restructureComoundMemberTree: "https://localhost:44375/api/Definitions/restructurecompoundmembertree",
  getCompoundList: 'https://localhost:44375/api/Definitions/getcompounds_compoundhierarchy',
  getCompound: 'https://localhost:44375/api/Definitions/getcompound',
  updateCompound: "https://localhost:44375/api/Definitions/updatecompound",
  addCompound: "https://localhost:44375/api/Definitions/addcompound",
  getPlatformLookups: "https://localhost:44375/api/Definitions/getplatformlookups",
  getCompoundCategoryLookups: "https://localhost:44375/api/Definitions/getcompoundcategorylookups",
  getProductCategoryLookups: "https://localhost:44375/api/Definitions/getproductcategorylookups",
  getMfgCurrencyLookups: "https://localhost:44375/api/Definitions/getmfgcurrencylookups",
  getMarketGroupLookups: "https://localhost:44375/api/Definitions/getmarketgrouplookups",
  getMfgs: "https://localhost:44375/api/Definitions/getmfglookups",
  getDeviceTypes: "https://localhost:44375/api/Definitions/getdevicetypelookups",
  getDeliveries: "https://localhost:44375/api/Definitions/getdeliveries"
};
