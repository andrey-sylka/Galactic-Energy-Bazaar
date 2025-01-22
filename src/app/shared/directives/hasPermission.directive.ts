import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { CredentialsService } from '@app/auth';

@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective implements OnInit {
  @Input('hasPermission') requiredRole: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private credentialsService: CredentialsService,
  ) {}

  ngOnInit() {
    const userRoles = this.credentialsService.credentials?.roles || [];

    if (userRoles.includes(this.requiredRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
