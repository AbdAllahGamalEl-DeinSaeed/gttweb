import { Component, OnInit, HostBinding } from '@angular/core';
import { ProductDetailsDTO, ProductCategory, TextDesciption, ProductMfg, PriceOption } from './../../../@core/Models/DTO/ProductDetailsDTO';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { NbToastrService } from '@nebular/theme';
import { productApiLinks } from './../../../@core/api-links/product-links'
import { PlatformLookupsService } from './../../../@core/lookups/platform-service'
import { ProductLookupsService } from './../../../@core/lookups/product-service'
import { PlatformLookups } from './../../../@core/Models/lookups/PlatformLookups'
import { ProductCategoryLookups, MfgCurrenyLookups, MarketGroupLookups, MfgLookups, DeviceTypeLookups, DeliveryLookups } from './../../../@core/Models/lookups/ProductLookups'
import { ThrowStmt } from '@angular/compiler';
import { MatDialog } from'@angular/material/dialog'

@Component({
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.scss']
})
export class NewProductFormComponent implements OnInit {

  productDetails?: ProductDetailsDTO;
  platformLookups: PlatformLookups[];
  productCategoryLookups: ProductCategoryLookups[];
  mfgCurrenyLookups: MfgCurrenyLookups[];
  marketGroupLookups: MarketGroupLookups[];
  mfgLookups: MfgLookups[];
  deviceTypeLookups: DeviceTypeLookups[];
  deliveryLookups: DeliveryLookups[];

  @HostBinding('class')
  classes = 'example-items-rows';

  constructor(private httpServices: HTTPService,
    private toastrService: NbToastrService,
    private productLookupsService : ProductLookupsService,
    private platformLookupsService: PlatformLookupsService,
    public dialog: MatDialog)
  {
    this.productDetails = new ProductDetailsDTO();
  }

  async ngOnInit()
  {
    this.platformLookups = await this.platformLookupsService.GetPlatforms() as PlatformLookups[];
    this.mfgCurrenyLookups = await this.productLookupsService.GetMfgCurrencies() as MfgCurrenyLookups[];
    this.deviceTypeLookups = await this.productLookupsService.GetDeviceTypes() as DeviceTypeLookups[];
    this.mfgLookups = await this.productLookupsService.GetMfgs() as MfgLookups[];
    this.deliveryLookups = await this.productLookupsService.GetDeliveries() as DeliveryLookups[];
  }

  async GetProductCategories(platformId)
  {
    this.productCategoryLookups = await this.productLookupsService.GetProductCategory(platformId) as ProductCategoryLookups[];
  }

  async GetMarketGroups(currencyCode)
  {
    this.marketGroupLookups = await this.productLookupsService.GetMarketGroups(currencyCode) as MarketGroupLookups[];
  }

  AddProduct(position, status)
  {
    this.httpServices.Post(productApiLinks.addProduct,null,this.productDetails).subscribe(res =>
    {
        this.toastrService.show(
          status || 'Success',
          `Product addition`,
          { position, status });
    })
  }
}
