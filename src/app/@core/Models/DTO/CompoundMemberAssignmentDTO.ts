export class CompoundMemberAssignmentDTO
{
  idCompoundMember: number;
  productAssignmentInformation : ProductAssignmentInformation[];

  constructor(){
    this.productAssignmentInformation = [new ProductAssignmentInformation()];
  }
}

export class ProductAssignmentInformation
{
  ProductId: number;
  ModelCode: string;
  Name: String;
  IsAssigned: boolean;
}

export class CompoundMembersTree
{
  idCompound : number;
  compoundMemberInsertions: CompoundMemberInsertions[];
  compoundMemberRemovals : string[];

  constructor(){
    this.compoundMemberInsertions = [new  CompoundMemberInsertions()];
  }
}

export class CompoundMemberInsertions
{
  name: string;
  parentName: string;
}

export class ProductAssignment
{
  productId: number;
  modelCode: string;
  name: String;
  isAssigned: boolean;
  productCategoryName: string;
  platformName: string;
}

