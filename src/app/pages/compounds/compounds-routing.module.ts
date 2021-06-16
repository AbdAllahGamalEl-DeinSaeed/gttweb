import { CompoundHierarchyComponent } from './compound-hierarchy/compound-hierarchy.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompoundsComponent } from './compounds.component';
import { CompoundListComponent } from './compound-list/compound-list.component'
import { NewCompoundComponent } from './new-compound/new-compound.component'
import { UpdateCompoundComponent } from './update-compound/update-compound.component'
import { CompoundMembersAssignmentComponent } from './compound-members-assignment/compound-members-assignment.component'

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
    },
    {
      path: 'new-compound',
      component: NewCompoundComponent
    },
    {
      path: 'update-compound',
      component: UpdateCompoundComponent
    },
    {
      path: 'compound-members-assignment',
      component: CompoundMembersAssignmentComponent
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
  CompoundListComponent,
  NewCompoundComponent,
  UpdateCompoundComponent,
  CompoundMembersAssignmentComponent
];
