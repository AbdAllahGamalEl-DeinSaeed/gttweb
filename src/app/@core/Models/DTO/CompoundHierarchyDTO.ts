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
  IdCompoundMember: number
  Name: string
  CompoundMembersChildren?: CompoundMembers_CompoundHierarchyDTO
}

export class CompoundMemberItems_CompoundHierarchyDTO{
  IdCompoundMemberItem: number
  IndexNo: number
}

export class Products_CompoundHierarchyDTO{
  ProductId: number ;
  ModelCode: string;
  Name: String;
}
