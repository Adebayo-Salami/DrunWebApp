import { Component, Inject, forwardRef } from "@angular/core";

@Component({
  selector: "app-footer",
  template: `
    <div class="layout-footer">
      <div class="logo-text">
        <img src="assets/layout/images/drunlogo.png" alt="Drun Web App" />
        <div class="text">
          <h1>Drun Web App</h1>
          <span>Drun Web Application</span>
        </div>
      </div>
      <div class="icons">
        <div class="icon icon-hastag" hidden="hidden">
          <i class="pi pi-home"></i>
        </div>
        <div class="icon icon-twitter">
          <i class="pi pi-globe"></i>
        </div>
        <div class="icon icon-prime" hidden="hidden">
          <i class="pi pi-bookmark"></i>
        </div>
      </div>
    </div>
  `,
})
export class AppFooterComponent {}
