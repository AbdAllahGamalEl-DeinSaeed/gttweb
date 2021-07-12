import { Component, OnInit } from '@angular/core';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { NbToastrService } from '@nebular/theme';
import { CompoundDetailsDTO } from './../../../@core/Models/DTO/CompoundDetailsDTO'
import { compoundApiLinks } from '../../../@core/api-links/compound-links';
import { CompoundCategoryLookups } from '../../../@core/Models/lookups/CompoundLookups'
import { CompoundLookupsService } from '../../../@core/lookups/compound-service'
import { PlatformLookupsService } from '../../../@core/lookups/platform-service'
import { PlatformLookups } from '../../../@core/Models/lookups/PlatformLookups'


@Component({
  selector: 'ngx-new-compound',
  templateUrl: './new-compound.component.html',
  styleUrls: ['./new-compound.component.scss']
})
export class NewCompoundComponent implements OnInit {

  compoundDetails: CompoundDetailsDTO;
  compoundCategoryLookups: CompoundCategoryLookups[];
  platformLookups: PlatformLookups[];

  constructor(
    private httpServices: HTTPService,
    private toasterService: NbToastrService,
    private compoundLookupsService: CompoundLookupsService,
    private platformLookupsService: PlatformLookupsService)
  {
    this.compoundDetails = new CompoundDetailsDTO();
  }

  async ngOnInit()
  {
    this.platformLookups = await this.platformLookupsService.GetPlatforms() as PlatformLookups[];
  }

  async GetCompoundCategoriesByPlatform(value)
  {
    this.compoundCategoryLookups = await this.compoundLookupsService.GetCompoundCategoriesByPlatForm(value) as CompoundCategoryLookups[]
  }

  AddCompound(position, status)
  {
    this.httpServices.Post(compoundApiLinks.addCompound,null,this.compoundDetails).subscribe(res =>
    {
        this.toasterService.show(
          status || 'Addition success',
          `Compound has been added succesfully`,
          { position, status });
    })
  }

}
