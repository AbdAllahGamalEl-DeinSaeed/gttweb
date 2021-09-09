import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsComponent } from './requests.component';
import { RequestCreationModalComponent } from './request-creation-modal/request-creation-modal.component'


const routes: Routes =
[{
  path: '',
  component: RequestsComponent,
  children: [
    {
      path:'request-creation-modal',
      component: RequestCreationModalComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule { }
export const routedComponents = [
  RequestsComponent,
  RequestCreationModalComponent
];
