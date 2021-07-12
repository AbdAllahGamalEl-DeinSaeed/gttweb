import { Component, OnInit } from '@angular/core';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { NbToastrService } from '@nebular/theme';
import { CompoundDetailsDTO } from './../../../@core/Models/DTO/CompoundDetailsDTO';
import { ActivatedRoute  } from '@angular/router';
import { Router } from '@angular/router';
import { compoundApiLinks } from '../../../@core/api-links/compound-links';

@Component({
  selector: 'ngx-update-compound',
  templateUrl: './update-compound.component.html',
  styleUrls: ['./update-compound.component.scss']
})
export class UpdateCompoundComponent implements OnInit {

  compoundDetails: CompoundDetailsDTO;
  compoundId: any;


  constructor(private httpServices: HTTPService, private toasterService: NbToastrService, private route: ActivatedRoute, private router: Router)
  {
    this.compoundDetails = new CompoundDetailsDTO();
  }

  ngOnInit(): void
  {
    this.compoundId = this.route.snapshot.queryParamMap.get('Compoundid');
    this.GetCompound(this.compoundId);
  }

  GetCompound(id: number)
  {
    this.httpServices.Get(compoundApiLinks.getCompound ,{compoundId: id}).subscribe((response: CompoundDetailsDTO) =>
    {
      this.compoundDetails = response ;
      console.log(this.compoundDetails);
    });
  }

  UpdateCompound(position, status)
  {
    this.httpServices.Post("https://localhost:44375/api/Definitions/updatecompound",null,this.compoundDetails).subscribe(res =>
    {
      console.log(res)
        this.toasterService.show(
          status || 'Update success',
          `Compound has been updated succesfully`,
          { position, status });
    })
  }

  AssignCompoundMembersPage()
  {
    this.router.navigate(['/pages/compounds/compound-members-assignment'], { queryParams: { Compoundid : this.compoundId}});
  }

}
