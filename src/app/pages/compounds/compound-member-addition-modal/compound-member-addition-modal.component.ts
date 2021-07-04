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
  newCompoundMemberNames : string[];

  constructor(private httpServices: HTTPService,
    private dialogRef: MatDialogRef<CompoundMemberAdditionModalComponent>,
    private toasterService: NbToastrService)
  {
    this.compoundMemberDetails = new CompoundMembersDTO();
    this.newCompoundMemberNames = [];
    this.newCompoundMemberNames.push(null);
  }

  ngOnInit(): void {
  }

  AddNewCompoundMemberName()
  {
    this.newCompoundMemberNames.push(null);
  }

  RemoveCompoundMemberName(name)
  {
    var index = this.newCompoundMemberNames.indexOf(name);
    this.newCompoundMemberNames.splice(index,1);
  }

  AddNewCompoundMember()
  {
    this.dialogRef.close(this.newCompoundMemberNames);
  }

  Dismiss()
  {
    this.newCompoundMemberNames = [];
    this.dialogRef.close(this.newCompoundMemberNames);
  }

  trackByFn(index: any, item: any)
  {
    return index;
  }
}
