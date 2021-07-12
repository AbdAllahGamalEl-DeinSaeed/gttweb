import { RouterModule } from '@angular/router';
import { FsIconComponent } from './ProductCategoryList/ProductCategoryList.component';
import { NgModule } from '@angular/core';
import { ProductsRoutingModule , routedComponents} from './products-routing.module';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,NbListModule,NbSelectModule,  NbCheckboxModule,NbButtonModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NewProductFormComponent } from './new-product-form/new-product-form.component';
import { PlatformLookupsService } from './../../@core/lookups/platform-service'
import { ProductLookupsService } from './../../@core/lookups/product-service'



@NgModule({
 imports: [
  NbCardModule,
  NbTreeGridModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  ProductsRoutingModule,
  ThemeModule,
  Ng2SmartTableModule,
  NbCheckboxModule,
  ngFormsModule,
  NbButtonModule,
  NbSelectModule,
  RouterModule
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    ProductListComponent,
    NewProductFormComponent,
  ],
  providers: [
    PlatformLookupsService,
    ProductLookupsService
  ]
})
export class ProductsModule { }
