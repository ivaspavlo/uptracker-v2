
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NOT_FOUND_ROUTES } from './constants';

@NgModule({
  imports: [
    RouterModule.forChild(NOT_FOUND_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class NotFoundRoutingModule { }
