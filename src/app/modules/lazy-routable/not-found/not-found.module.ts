
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './container/not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    NotFoundRoutingModule
  ],
  exports: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
