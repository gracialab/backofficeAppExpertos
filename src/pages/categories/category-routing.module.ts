import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path:'edit/:id',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPageRoutingModule {}
