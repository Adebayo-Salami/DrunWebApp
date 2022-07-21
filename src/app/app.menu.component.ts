import { Component, OnInit } from "@angular/core";
import { AppMainComponent } from "./app.main.component";

@Component({
  selector: "app-menu",
  templateUrl: "./app.menu.component.html",
})
export class AppMenuComponent implements OnInit {
  model: any[];

  constructor(public app: AppMainComponent) {}

  ngOnInit() {
    this.ConfigureAppMenu();
  }

  onMenuClick() {
    this.app.menuClick = true;
  }

  ConfigureAppMenu() {
    this.model = [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-home",
        routerLink: ["main/dashboard"],
        visible: true,
      },
      {
        label: "Setups",
        icon: "pi pi-fw pi-cog",
        visible: true,
        items: [
          {
            label: "Role Setup",
            icon: "pi pi-fw pi-id-card",
            routerLink: ["/main/setup/role"],
          },
          {
            label: "Product Setup",
            icon: "pi pi-fw pi-id-card",
            routerLink: ["/main/setup/product"],
          },
        ],
      },
      {
        label: "Customer Service",
        icon: "pi pi-fw pi-cog",
        visible: true,
        items: [
          {
            label: "Onboarding",
            icon: "pi pi-fw pi-id-card",
            routerLink: ["/main/customer/onboarding"],
          },
          {
            label: "Ordering",
            icon: "pi pi-fw pi-id-card",
            routerLink: ["/main/customer/ordering"],
          },
          {
            label: "Reporting",
            icon: "pi pi-fw pi-id-card",
            routerLink: ["/main/customer/reporting"],
          },
        ],
      },
    ];
  }
}
