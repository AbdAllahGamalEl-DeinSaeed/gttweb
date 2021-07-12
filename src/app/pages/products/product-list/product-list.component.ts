import { DeliveryLookups } from './../../../@core/Models/lookups/ProductLookups';
import { PriceOption, ProductDetailsDTO } from './../../../@core/Models/DTO/ProductDetailsDTO';
import { Products_ProductHierarchyDTO } from './../../../@core/Models/DTO/ProductHierarchy';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { productApiLinks } from './../../../@core/api-links/product-links'
import { PlatformLookups } from '../../../@core/Models/lookups/PlatformLookups';
import { DeviceTypeLookups, MarketGroupLookups, MfgCurrenyLookups, MfgLookups, ProductCategoryLookups } from '../../../@core/Models/lookups/ProductLookups';
import { ProductLookupsService } from '../../../@core/lookups/product-service';
import { PlatformLookupsService } from '../../../@core/lookups/platform-service';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-Product-List',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  categoryid: string;
  productId: number;
  productsList: Products_ProductHierarchyDTO[];
  productDetails? : ProductDetailsDTO;
  platformLookups: PlatformLookups[];
  productCategoryLookups: ProductCategoryLookups[];
  mfgCurrenyLookups: MfgCurrenyLookups[];
  marketGroupLookups: MarketGroupLookups[];
  mfgLookups: MfgLookups[];
  deviceTypeLookups: DeviceTypeLookups[];
  deliveryLookups: DeliveryLookups[];
  isProductEditable: boolean;
  constructor(private route: ActivatedRoute , private toastrService: NbToastrService,  private httpServices: HTTPService, private productLookupsService : ProductLookupsService,
    private platformLookupsService: PlatformLookupsService)
  {

  }

  async ngOnInit()
  {
    this.categoryid = this.route.snapshot.queryParamMap.get('Catogeryid');
    this.GetProductList(this.categoryid);
    this.isProductEditable = false;
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

  EditProduct()
  {
    this.isProductEditable = true;
    this.GetProductLookups();
    if(this.productDetails.productMfgs[0].priceOption == null)
    {
      this.productDetails.productMfgs[0].priceOption = new PriceOption;
    }
  }

  async GetProductLookups()
  {
    if(this.productDetails.platform.idPlatform != null)
    {
      await this.GetProductCategories(this.productDetails.platform.idPlatform);
    }

    if(this.productDetails.productMfgs[0].mfgCurrency != null)
    {
      await this.GetMarketGroups(this.productDetails.productMfgs[0].mfgCurrency);
    }
  }

  CancelProductUpdate()
  {
    this.isProductEditable = false;
    this.GetProduct(this.productId);
  }

  GetProductList(id: string )
  {
    this.httpServices.Get(productApiLinks.getProductList ,{productCategoryId: id}).subscribe((response: Products_ProductHierarchyDTO[]) =>
    {
      this.productsList = response ;
    });
  }

 async GetProduct(productId)
  {
    this.productDetails = new ProductDetailsDTO;
    await this.httpServices.Get(productApiLinks.getProduct , {productId: productId}).subscribe((response :ProductDetailsDTO)=>
    {
      this.productDetails = response;
    });
  }

  SaveProductUpdate(position, status)
  {
    this.httpServices.Post(productApiLinks.updateProduct ,{},this.productDetails).subscribe((response :any)=>{
    this.toastrService.show(
        status || 'Success',
        `Product updated`,
        { position, status });
    this.isProductEditable = false;
    this.GetProduct(this.productId);
    });
  }
}


