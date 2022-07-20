
import { Directive, OnInit , Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { IHasPermitReq } from '@app/interfaces';
import { HasPermitReq } from '@app/shared/models';
import { PermissionService } from '@app/core/services';
import { PERMIT_FEATURE_NAME } from '@app/core/constants';


@Directive({
  selector: '[appPermitHide]'
})
export class PermitHideDirective implements OnInit {

  @Input('appPermitHide') set hasPermitReq(value: [ PERMIT_FEATURE_NAME, string ]) { this._hasPermitReq = new HasPermitReq(value); }
  private _hasPermitReq: IHasPermitReq;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.permissionService.hasActionPermit(this._hasPermitReq) ?
      this.viewContainer.createEmbeddedView(this.templateRef) :
      this.viewContainer.clear();
  }
}
