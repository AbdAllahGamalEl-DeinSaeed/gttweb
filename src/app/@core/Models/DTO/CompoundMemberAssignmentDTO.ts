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
  compoundMemberInsertions: CompoundMemberInsertions[];
  compoundMemberRemovals : CompoundMemberRemovals[];

  constructor(){
    this.compoundMemberInsertions = [new  CompoundMemberInsertions()];
    this.compoundMemberRemovals = [new CompoundMemberRemovals()];
  }
}

export class CompoundMemberInsertions
{
  idCompound : number;
  name: string;
  parentName: string;
}

export class CompoundMemberRemovals
{
  name: string;
}
