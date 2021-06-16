import { Component, OnInit } from '@angular/core';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { NbToastrService } from '@nebular/theme';
import { CompoundDetailsDTO } from './../../../@core/Models/DTO/CompoundDetailsDTO'

@Component({
  selector: 'ngx-new-compound',
  templateUrl: './new-compound.component.html',
  styleUrls: ['./new-compound.component.scss']
})
export class NewCompoundComponent implements OnInit {

  compoundDetails: CompoundDetailsDTO;
  constructor(private httpServices: HTTPService, private toasterService: NbToastrService)
  {
    this.compoundDetails = new CompoundDetailsDTO();

  }

  ngOnInit(): void {
  }

  AddCompound(position, status){

    this.httpServices.Post("https://localhost:44375/api/Definitions/addcompound",null,this.compoundDetails).subscribe(res =>
    {
      debugger
      console.log(res)
        this.toasterService.show(
          status || 'Addition success',
          `Compound has been added succesfully`,
          { position, status });
    })


  }

}
