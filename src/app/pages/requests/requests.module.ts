import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,NbListModule,NbSelectModule,  NbCheckboxModule,NbButtonModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { RequestsRoutingModule , routedComponents } from './requests-routing.module';
import { RequestCreationModalComponent } from './request-creation-modal/request-creation-modal.component'


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
    RequestsRoutingModule
    ],
    declarations: [
      ...routedComponents,
      RequestCreationModalComponent
    ]
})
export class RequestsModule { }
