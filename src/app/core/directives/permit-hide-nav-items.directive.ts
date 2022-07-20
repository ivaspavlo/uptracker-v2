
import { Directive, OnInit , Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '@app/core/services';
import { PERMIT_FEATURE_NAME } from '@app/core/constants/permit-feature-names';


@Directive({
  selector: '[appPermitHideNav]'
})
export class PermitHideNavDirective implements OnInit {

  @Input('appPermitHideNav') permit_feature: PERMIT_FEATURE_NAME | null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    !this.permit_feature || this.permissionService.hasFeaturePermit(this.permit_feature) ?
      this.viewContainer.createEmbeddedView(this.templateRef) :
      this.viewContainer.clear();
  }
}
