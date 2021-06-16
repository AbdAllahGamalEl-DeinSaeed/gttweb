import { Component, OnInit, Inject } from '@angular/core';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompoundMembersDTO } from './../../../@core/Models/DTO/CompoundDetailsDTO'
import { MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'ngx-compound-member-addition-modal',
  templateUrl: './compound-member-addition-modal.component.html',
  styleUrls: ['./compound-member-addition-modal.component.scss']
})
export class CompoundMemberAdditionModalComponent implements OnInit {

  compoundMemberDetails : CompoundMembersDTO;

  constructor(private httpServices: HTTPService,
    private dialogRef: MatDialogRef<CompoundMemberAdditionModalComponent>,
    private toasterService: NbToastrService, @Inject(MAT_DIALOG_DATA) public data: {newCompoundMemberName : string})
  {
    this.compoundMemberDetails = new CompoundMembersDTO();
  }

  ngOnInit(): void {
  }

  AddCompoundMember(){

    debugger
    //this.compoundMemberDetails.idCompound = this.data.compoundId;
    //this.compoundMemberDetails.idParent = this.data.parentId;
    /*this.httpServices.Post("https://localhost:44375/api/Definitions/addcompoundmember",null,this.compoundMemberDetails).subscribe(res =>
    {
      debugger
      this.dialogRef.close();
      console.log(res)
        this.toasterService.show(
          status || 'Addition success',
          `Compound member has been added succesfully`,
          { position, status });
    })*/
  }

  AddNewCompoundMember()
  {
    this.dialogRef.close(this.data.newCompoundMemberName);
  }

  Dismiss()
  {
    this.dialogRef.close();
  }

}
