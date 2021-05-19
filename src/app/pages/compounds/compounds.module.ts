import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompoundsRoutingModule , routedComponents} from './compounds-routing.module';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,NbListModule,NbSelectModule,  NbCheckboxModule,NbButtonModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { CompoundHierarchyComponent, FsIconComponent } from './compound-hierarchy/compound-hierarchy.component';
import { CompoundListComponent, FsIconCompoundListComponent, ProductListService } from './compound-list/compound-list.component'



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
  ],
  providers: [
    ProductListService
  ]
})
export class CompoundsModule { }
