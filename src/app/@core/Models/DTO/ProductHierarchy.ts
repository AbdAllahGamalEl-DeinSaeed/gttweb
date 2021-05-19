// tslint:disable-next-line: class-name
export class Platforms_ProductHierarchyDTO {
  PlatformID: number ;
  Name: String ;
}

// tslint:disable-next-line: class-name
export class ProductCategories_ProductHierarchyDTO {
  ProductCategoryId: number;
  Name: string;
  ProductCategoriesChildren?: ProductCategories_ProductHierarchyDTO;
}

// tslint:disable-next-line: class-name
export class Products_ProductHierarchyDTO {
  ProductId: number ;
  ModelCode: string;
  Name: String;
}

