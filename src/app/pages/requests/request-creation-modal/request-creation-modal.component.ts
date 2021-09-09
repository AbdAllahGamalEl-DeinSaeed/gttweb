import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-request-creation-modal',
  templateUrl: './request-creation-modal.component.html',
  styleUrls: ['./request-creation-modal.component.scss']
})
export class RequestCreationModalComponent implements OnInit {

  assignedHigherChangeAgents: string[];
  unassignedHigherChangeAgents: string [];
  selectedHigherChangeAgent: string;

  constructor(private dialogRef: MatDialogRef<RequestCreationModalComponent>)
  {
    this.unassignedHigherChangeAgents = ["1","2","3"];
  }

  ngOnInit(): void {
  }

  AssignHigherChangeAgent()
  {
    this.unassignedHigherChangeAgents.push(this.selectedHigherChangeAgent);
    let index = this.assignedHigherChangeAgents.indexOf(this.selectedHigherChangeAgent);
    this.assignedHigherChangeAgents.splice(index, 1);
  }

  RemoveHigherChangeAgent(higherChangeAgentName)
  {
    this.assignedHigherChangeAgents.push(higherChangeAgentName);
    let index = this.unassignedHigherChangeAgents.indexOf(higherChangeAgentName);
    this.unassignedHigherChangeAgents.splice(index, 1);
  }

  Confirm()
  {
    this.dialogRef.close(this.assignedHigherChangeAgents);
  }

  Dismiss()
  {
    this.assignedHigherChangeAgents = [];
    this.dialogRef.close(this.assignedHigherChangeAgents);
  }
}
