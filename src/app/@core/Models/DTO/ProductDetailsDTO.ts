export class ProductDetailsDTO {
  idProduct: number;
  modelCode?: string;
  productType: string;
  lifecycle?: boolean;
  obsolete?: boolean;
  useInCompounds: boolean;
  weight?: any;
  description?: any;
  doNotUse?: any;
  tmpStatusNotes?: any;
  prerelease?: any;
  cUser: number;
  cDatetime: Date;
  mUser: number;
  status: number;
  statusDate: Date;
  statusUser?: any;
  pssUrlCode?: any;
  heightMm?: any;
  widthMm?: any;
  powerUsageW?: any;
  heatGenerationW?: any;
  headGenerationBtu?: any;
  platform: Platform;
  productCategory: ProductCategory;
  deviceType?: DeviceType;
  selectionProfile?: SelectionProfile;
  textDesciption: TextDesciption;
  cables: Cable[];
  interfaces: Interface[];
  itemProfileValues: ItemProfileValue[];
  productMfgs: ProductMfg[];
  productSpecificationSheets: ProductSpecificationSheet[];
  taBarriers: TaBarrier[];
  terminationAssemblies: TerminationAssembly[];
  palTemplateContentItems: PalTemplateContentItem[];

  constructor(){
    this.textDesciption = new TextDesciption();
    this.platform = new Platform();
    this.productCategory = new ProductCategory();
    this.productMfgs = [new ProductMfg()];
    this.deviceType = new DeviceType();
    this.selectionProfile = new SelectionProfile();
    this.cables = [new Cable()];
    this.interfaces = [new Interface()];
    this.itemProfileValues = [new ItemProfileValue()];
    this.productSpecificationSheets = [new ProductSpecificationSheet()];
    this.taBarriers = [new TaBarrier()];
    this.terminationAssemblies = [new TerminationAssembly()];
    this.palTemplateContentItems = [new PalTemplateContentItem()];
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

export class ProductCategory {
  idCategory: number;
  idPlatform: number;
  idParent: number;
  name: string;
  description?: any;
  indexNo: number;
  cUser: number;
  cDatetime: Date;
  mUser?: any;
}
export class TextDesciption {
  idDesc: number;
  textKey?: any;
  valueShort: string;
  valueLong?: string;
  cUser: number;
  cDatetime: Date;
  mUser?: any;
  obsolete?: any;
}
export class PriceOption {
  idPriceOption: number;
  priceKey: number;
  priceSeq: number;
  indexNo: number;
  transferPrice: number;
  listPrice: number;
  grossMargin: number;
  value: number;
  transferFormula?: any;
  listFormula?: any;
  valueFormula?: any;
  percentage: number;
  userValue: boolean;
  userPercentage: boolean;
  minQty: number;
  maxQty: number;
  cablePrice: number;
  minLen: number;
  maxLen: number;
  freeLen: number;
  test?: any;
  idPrereleaseMfg?: any;
  cUser: number;
  cDatetime: Date;
  mUser: number;
  idTextDesc: number;
  idUom: number;
  productPrice?: ProductPrice;

  constructor(){
    this.productPrice = new ProductPrice();
  }
}
export class ProductMfg {
  idProductMfg: number;
  idProduct: number;
  idMfg: number;
  idTextDesc: number;
  indexNo?: any;
  priceKey: number;
  marketGroup: string;
  mfgCurrency: string;
  countryOfOrigin: string;
  deliveryCode: string;
  cUser: number;
  cDatetime: Date;
  mUser: number;
  eccnNumber: string;
  removeFromSearch: boolean;
  newSystemCode: string;
  harmonizeNumber: string;
  modelCodeSuperceded?: any;
  salesTaxCode: string;
  priceSheet: string;
  priceTab: string;
  priceSubtab: number;
  pss: string;
  modelCodeDefault?: any;
  materialTypeCode: string;
  materialSubTypeCode: string;
  maxQty: number;
  test?: any;
  software: boolean;
  plantCode: string;
  sourceCode: string;
  clientCode: string;
  lineItemNote?: any;
  unspscCode?: any;
  orderValueTest?: any;
  availabilityDate: Date;
  priceOption: PriceOption;

  constructor(){
    this.priceOption = new PriceOption();
  }
}

export class DeviceType {
  idDeviceType: number
  shortname: string
  name: string
  idDtGroup: number
  isDefault: any
  description: any
  ioSets: any
  communications: any
  hmiNetwork: any
  fieldbusExtender: any
  userAppIcon: string
  cUser: number
  cDatetime: string
  mUser: any
}

export class SelectionProfile{
  IdSelectionProfile: number
  Name: string
  ForeColor: number
  BackColor: number
  Description: string
  CUser: number
  CDatetime: any
  MUser: number
}

export class Cable{
  IdCable: number
  IdCableType: number
  IdPlatform: number
  IdProduct: number
  IdResale: number
  ModelCode: string
  Shortname: string
  Name: string
  Description: string
  LengthM: number
}

export class Interface{
  IdInterface: number
  IdProduct: number
  IdResale: number
  Shortname: string
  Name: string
  Quantity: number
  RedundacyRatio: number
  Hotspare: boolean
  Provider: boolean
  IndexNo: number
  Description: string
  CUser: number
  CDatetime: any
  MUser: number
}

export class ItemProfileValue{
  IdItemProfileValue: number
  IdEnumProfileValue: number
  IdProduct: number
  IdResale: number
  IdCompound: number
  ValueId: number
  ValueInteger: number
  ValueFloat: number
  ValueString: string
  ValueBoolean: boolean
  CUser: number
  CDatetime: any
  MUser: number
}

export class ProductSpecificationSheet{
  IdSpecification: number
  Name: string
  Url: string
  IdProduct: number
  IdResale: number
  IdPlatform: number
  IdCompoundMember: number
  Obsolete: boolean
  IdPssCategory: number
  CUser: number
  CDatetime: any
  MUser: number

}

export class TaBarrier{
  IdBarrier: number
  ModelCode: string
  IdProduct: number
  IdResale: number
  Shortname: string
  Name: string
  Description: string
  HeatW: number
  PowerW: number
  IdIsolation: number

}

export class TerminationAssembly{
  IdAssembly: number
  ModelCode: string
  IdProduct: number
  IdResale: number
  Shortname: string
  Name: string
  Description: string
  IntrisicallySafe: boolean
  HeightMm: number
  WidthMm: number
  HeatW:number
  Material: string
  IdIsolationInput: number
  IdIsolationOutput: number
  Commoned: boolean
  NonIncendive: boolean
  NuclearUse: boolean
  RoHs: boolean
  BaseplateMounted: boolean
}

export class PalTemplateContentItem{
  IdPalTemplateContentItem: number
  IdPalTemplateContent: number
  IdProduct: number
  IdResale: number
  IdCompound: number
  IdPlatform: number
  CUser: number
  CDatetime: any
  MUser: number
}

export class ProductPrice{
  PriceKey: number
  CUser: number
  CDatetime: any
  MUser: number
}
