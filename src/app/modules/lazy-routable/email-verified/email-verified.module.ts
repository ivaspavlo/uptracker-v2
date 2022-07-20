
import { NgModule } from '@angular/core';
import { EmailVerifiedComponent } from './container/email-verified.component';
import { EmailVerifiedRoutingModule } from './email-verified-routing.module';


@NgModule({
  declarations: [
    EmailVerifiedComponent
  ],
  imports: [
    EmailVerifiedRoutingModule
  ],
  exports: [
    EmailVerifiedComponent
  ]
})
export class EmailVerifiedModule { }
