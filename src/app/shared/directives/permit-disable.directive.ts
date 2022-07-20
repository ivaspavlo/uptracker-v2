
import { Directive, ElementRef, OnInit , Input } from '@angular/core';
import { IHasPermitReq } from '@app/interfaces';
import { PermissionService } from '@app/core/services';
import { HasPermitReq } from '@app/shared/models';
import { PERMIT_FEATURE_NAME } from '@app/core/constants';


@Directive({
  selector: '[appPermitDisable]'
})
export class PermitDisableDirective implements OnInit {

  @Input('appPermitDisable') set permission(value: [ PERMIT_FEATURE_NAME, string ]) { this._permitReq = new HasPermitReq(value); }
  private _permitReq: IHasPermitReq;

  constructor(
    private el: ElementRef,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    if (!this.permissionService.hasActionPermit(this._permitReq)) {
      this.el.nativeElement.disabled = true;
    }
  }
}
