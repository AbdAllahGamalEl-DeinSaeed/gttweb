import { HTTPService } from './../Services/HTTP/HTTPService';
import { Injectable } from "@angular/core";
import { lookupApiLinks } from './../api-links/lookup-links'

@Injectable()
export class CompoundLookupsService
{
  constructor(private httpServices: HTTPService)
  {

  }

  GetCompoundCategoriesByPlatForm(id)
  {
    return this.httpServices.Get(lookupApiLinks.getCompoundCategoryLookups, {platformId: id}).toPromise();
  }
}
