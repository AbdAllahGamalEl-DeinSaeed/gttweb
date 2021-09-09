import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompoundsRoutingModule , routedComponents} from './compounds-routing.module';
import { NbCardModule, NbIconModule, NbAutocompleteModule, NbTooltipModule, NbInputModule, NbTreeGridModule,NbListModule,NbSelectModule,  NbCheckboxModule,NbButtonModule
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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {CompoundLookupsService} from '../../@core/lookups/compound-service'
import {PlatformLookupsService} from '../../@core/lookups/platform-service'

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
  NbTooltipModule,
  NbAutocompleteModule,
  RouterModule,
  CompoundsRoutingModule,
  MatFormFieldModule,
  MatSelectModule
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
    CompoundListService,
    PlatformLookupsService,
    CompoundLookupsService
  ]
})
export class CompoundsModule { }
