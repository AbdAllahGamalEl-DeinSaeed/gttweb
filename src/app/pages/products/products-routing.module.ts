import { NewProductFormComponent } from './new-product-form/new-product-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoryListComponent } from './ProductCategoryList/ProductCategoryList.component';
import { ProductsComponent } from './products.component';


const routes: Routes =
[{
  path: '',
  component: ProductsComponent,
  children: [
    {
      path: 'ProductCategoryList',
      component: ProductCategoryListComponent,
    },
    {
      path:'product-list',
      component: ProductListComponent,
    },
    {
      path:'new-product-form',
      component:NewProductFormComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
export const routedComponents = [
  ProductsComponent,
  ProductCategoryListComponent,
  ProductListComponent,
  NewProductFormComponent,
];
