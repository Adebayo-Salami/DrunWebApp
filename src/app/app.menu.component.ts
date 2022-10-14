import { ProfileVM } from "./interfaces/user";
import { Component, OnInit } from "@angular/core";
import { AppMainComponent } from "./app.main.component";
import { PagesEnum } from "./interfaces/main";

@Component({
  selector: "app-menu",
  templateUrl: "./app.menu.component.html",
})
export class AppMenuComponent implements OnInit {
  model: any[];

  constructor(public app: AppMainComponent) {}

  ngOnInit() {
    this.ConfigureAppMenu();

    if (!this.authUserProfile.role) {
      sessionStorage.clear();
      localStorage.clear();
      return false;
    }
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
        visible: this.IsPageVisible(1),
      },
      {
        label: "Setups",
        icon: "pi pi-fw pi-cog",
        visible: this.IsParentPageVisible([2, 3, 11]),
        items: [
          {
            label: "Role Setup",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(2),
            routerLink: ["/main/setup/role"],
          },
          {
            label: "User Role Setup",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(11),
            routerLink: ["/main/setup/role"],
          },
          {
            label: "Product Setup",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(3),
            routerLink: ["/main/setup/product"],
          },
        ],
      },
      {
        label: "Customer Service",
        icon: "pi pi-fw pi-cog",
        visible: this.IsParentPageVisible([4, 5, 6, 10]),
        items: [
          {
            label: "Onboarding",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(4),
            routerLink: ["/main/customer/onboarding"],
          },
          {
            label: "Ordering",
            icon: "pi pi-fw pi-cog",
            visible: this.IsParentPageVisible([5, 6, 10]),
            items: [
              {
                label: "Create Order",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(5),
                routerLink: ["/main/customer/ordering"],
              },
              {
                label: "Approve Order",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(10),
                routerLink: ["/main/customer/ordering/approval"],
              },
              {
                label: "View Orders",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(6),
                routerLink: ["/main/customer/ordering/view"],
              },
            ],
          },
          {
            label: "Reporting",
            icon: "pi pi-fw pi-cog",
            visible: this.IsParentPageVisible([7, 8, 9]),
            items: [
              {
                label: "Customers Volume",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(7),
                routerLink: ["/main/customer/reporting"],
              },
              {
                label: "Debt Age Analysis",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(8),
                routerLink: ["/main/customer/reporting"],
              },
              {
                label: "Product Mix",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(9),
                routerLink: ["/main/customer/reporting"],
              },
            ],
          },
        ],
      },
    ];
  }

  IsPageVisible(pageKey: number): boolean {
    let visible = false;
    let userProfile = this.authUserProfile as ProfileVM;
    let rolePages = userProfile.role.rolePages;
    rolePages.forEach((page) => {
      if (page) {
        if (+page == pageKey) visible = true;
      }
    });

    return visible;
  }

  IsParentPageVisible(pageKeys: number[]): boolean {
    let userProfile = this.authUserProfile as ProfileVM;
    let rolePages = userProfile.role.rolePages;
    let permission = rolePages.find((x) => pageKeys.find((y) => y == +x));

    return permission ? true : false;
  }

  get authUserProfile() {
    return this.getSessionStorageItem("userProfile");
  }

  getSessionStorageItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }
}
