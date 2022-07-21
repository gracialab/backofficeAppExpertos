import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryPageRoutingModule } from './category-routing.module';
import { CategoryService } from './category.service';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryPageRoutingModule,
  ],
  declarations: [
    ListComponent,
    CreateComponent
  ],
  providers:[CategoryService]
})
export class CategoryModule {}
