import { HTTPService } from './../Services/HTTP/HTTPService';
import { Injectable } from "@angular/core";
import { lookupApiLinks } from './../api-links/lookup-links'

@Injectable()
export class ProductLookupsService
{
  constructor(private httpServices: HTTPService)
  {

  }

  GetProductCategory(platformId)
  {
    return this.httpServices.Get(lookupApiLinks.getProductCategoryLookups, {platformId: platformId}).toPromise();
  }

  GetMfgCurrencies()
  {
    return this.httpServices.Get(lookupApiLinks.getMfgCurrencyLookups).toPromise();
  }

  GetMarketGroups(currencyCode)
  {
    return this.httpServices.Get(lookupApiLinks.getMarketGroupLookups, {currencyCode: currencyCode}).toPromise();
  }

  GetMfgs()
  {
    return this.httpServices.Get(lookupApiLinks.getMfgs).toPromise();
  }

  GetDeviceTypes()
  {
    return this.httpServices.Get(lookupApiLinks.getDeviceTypes).toPromise();
  }

  GetDeliveries()
  {
    return this.httpServices.Get(lookupApiLinks.getDeliveries).toPromise();
  }
}
