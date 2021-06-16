import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompoundsRoutingModule , routedComponents} from './compounds-routing.module';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,NbListModule,NbSelectModule,  NbCheckboxModule,NbButtonModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { CompoundHierarchyComponent, FsIconComponent } from './compound-hierarchy/compound-hierarchy.component';
import { CompoundListComponent, FsIconCompoundListComponent, ProductListService, CompoundListService } from './compound-list/compound-list.component'
import { NewCompoundComponent } from './new-compound/new-compound.component'
import { UpdateCompoundComponent } from './update-compound/update-compound.component'
import { CompoundMembersAssignmentComponent, AssignCompoundMembersService, FsIconCompoundMembersAssignmentComponent } from './compound-members-assignment/compound-members-assignment.component'
import { CompoundMemberAdditionModalComponent } from './compound-member-addition-modal/compound-member-addition-modal.component'


@NgModule({
 imports: [
  NbCardModule,
  NbTreeGridModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  ThemeModule,
  Ng2SmartTableModule,
  NbCheckboxModule,
  ngFormsModule,
  NbButtonModule,
  NbSelectModule,
  RouterModule,
  CompoundsRoutingModule,


  ],
  declarations: [
    ...routedComponents,
    CompoundHierarchyComponent,
    FsIconComponent,
    CompoundListComponent,
    FsIconCompoundListComponent,
    NewCompoundComponent,
    UpdateCompoundComponent,
    CompoundMembersAssignmentComponent,
    CompoundMemberAdditionModalComponent,
    FsIconCompoundMembersAssignmentComponent
  ],
  providers: [
    ProductListService,
    AssignCompoundMembersService,
    CompoundListService
  ]
})
export class CompoundsModule { }
