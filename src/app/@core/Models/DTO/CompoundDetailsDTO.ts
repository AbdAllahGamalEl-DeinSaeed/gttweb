export class CompoundDetailsDTO{
  idCompound: number;
  platform: Platform;
  compoundCategory: CompoundCategory;
  idSelectionProfile?: number;
  shortname: string;
  name: string;
  configuratorUse?: boolean;
  redundant?: boolean;
  remoteIo?: boolean;
  zone0?: boolean;
  zone1?: boolean;
  zone2?: boolean;
  zone20?: boolean;
  zone21?: boolean;
  zone22?: boolean;
  multiprotocol?: boolean;
  description: string;
  universalIo?: boolean;
  tmpStatusNotes: string;
  cUser?: number;
  cDatetime: any;
  mUser?: number;
  datetimestamp? : any;
  syncid?: any;
  status?: any;
  statusDate?: any;
  statusUser?: number;
  doNotUse?: boolean;
  intrisicallySafe? : boolean;
  compoundMembers: CompoundMembersDTO[];

  constructor(){
    this.compoundMembers = [new CompoundMembersDTO()];
    this.platform = new Platform();
    this.compoundCategory = new CompoundCategory();
  }
}


export class Platform {
  idPlatform: number;
  shortname: string;
  name: string;
  description?: any;
  system: boolean;
  schemaName: string;
  designerAllowed: boolean;
  idParent?: any;
  cUser: number;
  cDatetime: Date;
  mUser: number;
}

export class CompoundCategory{
  idCompoundCategory: number
  name: string
}

export class CompoundMembersDTO{
  idCompoundMember: number;
  idCompound?: number;
  idParent?: number;
  tab?: boolean;
  name: string;
  optional?: boolean;
  defaultOptionalValue?: boolean;
  description: string;
  indexNo?: number;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  adjQuantity: boolean;
  cUser?: number;
  cDatetime: any;
  mUser?: number;
  datetimestamp?: any;
  syncid?: any;
  selectionMarker?: boolean;
  redundant?: boolean
  compoundMembersChildren: CompoundMembersDTO[];
}
