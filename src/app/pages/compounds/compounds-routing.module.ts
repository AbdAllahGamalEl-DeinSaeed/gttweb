import { CompoundHierarchyComponent } from './compound-hierarchy/compound-hierarchy.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompoundsComponent } from './compounds.component';
import { CompoundListComponent } from './compound-list/compound-list.component'

const routes: Routes =
[{
  path: '',
  component: CompoundsComponent,
  children: [
    {
      path: 'compound-hierarchy',
      component: CompoundHierarchyComponent,
    },
    {
      path: 'compound-list',
      component: CompoundListComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompoundsRoutingModule { }
export const routedComponents = [
  CompoundsComponent,
  CompoundHierarchyComponent,
  CompoundListComponent
];
