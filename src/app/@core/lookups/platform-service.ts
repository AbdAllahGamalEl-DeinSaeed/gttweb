import { HTTPService } from './../Services/HTTP/HTTPService';
import { Injectable } from "@angular/core";
import { lookupApiLinks } from './../api-links/lookup-links'

@Injectable()
export class PlatformLookupsService
{
  constructor(private httpServices: HTTPService)
  {

  }

  GetPlatforms()
  {
    return this.httpServices.Get(lookupApiLinks.getPlatformLookups).toPromise();
  }
}
