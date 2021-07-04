export class CompoundCategories_CompoundHierarchyDTO{
  IdCompoundCategory: number
  Name: string
  CompoundCategoriesChildren?: CompoundCategories_CompoundHierarchyDTO
}

export class Compounds_CompoundHierarchyDTO{
  IdCompound: number
  Shortname: string
  Name: string
}

export class CompoundMembers_CompoundHierarchyDTO{
  idCompoundMember: number
  name: string
  compoundMembersChildren?: CompoundMembers_CompoundHierarchyDTO[]
}

export class CompoundMemberItems_CompoundHierarchyDTO{
  IdCompoundMemberItem: number
  IndexNo: number
}

export class Products_CompoundHierarchyDTO{
  productId: number ;
  modelCode: string;
  name: string;
  productCategoryName: string;
  platformName: string;
}
