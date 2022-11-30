import { ProfileVM, User, UserRole } from "./interfaces/user";
import { Component, OnInit } from "@angular/core";
import { AppMainComponent } from "./app.main.component";
import { PagesEnum } from "./interfaces/main";

@Component({
  selector: "app-menu",
  templateUrl: "./app.menu.component.html",
})
export class AppMenuComponent implements OnInit {
  model: any[];
  rolePages: string[] = [];

  constructor(public app: AppMainComponent) {}

  ngOnInit() {
    if (!this.authUserProfile.userRoles) {
      sessionStorage.clear();
      localStorage.clear();
      return false;
    }
    this.LoadLoggedInUserRolePages();

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
        visible: this.IsPageVisible(PagesEnum.Dashboard),
      },
      {
        label: "Profile",
        icon: "pi pi-fw pi-home",
        routerLink: ["main/profile"],
        visible: true,
      },
      {
        label: "Setups",
        icon: "pi pi-fw pi-cog",
        visible: this.IsParentPageVisible([
          PagesEnum.Setup_Role,
          PagesEnum.Setup_Product,
          PagesEnum.Setup_UserRole,
          PagesEnum.Setup_User,
        ]),
        items: [
          {
            label: "Role Setup",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(PagesEnum.Setup_Role),
            routerLink: ["/main/setup/role"],
          },
          {
            label: "User Setup",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(PagesEnum.Setup_User),
            routerLink: ["/main/setup/user"],
          },
          {
            label: "Product Setup",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(PagesEnum.Setup_Product),
            routerLink: ["/main/setup/product"],
          },
        ],
      },
      {
        label: "Inventory Service",
        icon: "pi pi-fw pi-cog",
        visible: this.IsParentPageVisible([
          PagesEnum.Inventory_Setup,
          PagesEnum.Inventory_ItemRequest,
          PagesEnum.Inventory_ItemApproval,
          PagesEnum.Inventory_ItemStore,
        ]),
        items: [
          {
            label: "Setup",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(PagesEnum.Inventory_Setup),
            routerLink: ["/main/inventory/setup"],
          },
          {
            label: "Item Request",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(PagesEnum.Inventory_ItemRequest),
            routerLink: ["/main/inventory/item-request"],
          },
          {
            label: "Item Approval",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(PagesEnum.Inventory_ItemApproval),
            routerLink: ["/main/inventory/item-approval"],
          },
          {
            label: "Item Confirmation",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(PagesEnum.Inventory_ItemConfirmation),
            routerLink: ["/main/inventory/item-confirmation"],
          },
          {
            label: "Item Store",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(PagesEnum.Inventory_ItemStore),
            routerLink: ["/main/inventory/item-store"],
          },
        ],
      },
      {
        label: "Customer Service",
        icon: "pi pi-fw pi-cog",
        visible: this.IsParentPageVisible([
          PagesEnum.Customer_Onboarding,
          PagesEnum.Customer_Ordering_CreateOrder,
          PagesEnum.Customer_Ordering_ViewOrders,
          PagesEnum.Customer_Ordering_ApproveOrder,
        ]),
        items: [
          {
            label: "Onboarding",
            icon: "pi pi-fw pi-id-card",
            visible: this.IsPageVisible(PagesEnum.Customer_Onboarding),
            routerLink: ["/main/customer/onboarding"],
          },
          {
            label: "Ordering",
            icon: "pi pi-fw pi-cog",
            visible: this.IsParentPageVisible([
              PagesEnum.Customer_Ordering_CreateOrder,
              PagesEnum.Customer_Ordering_ViewOrders,
              PagesEnum.Customer_Ordering_ApproveOrder,
            ]),
            items: [
              {
                label: "Create Order",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(
                  PagesEnum.Customer_Ordering_CreateOrder
                ),
                routerLink: ["/main/customer/ordering"],
              },
              {
                label: "Approve Order",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(
                  PagesEnum.Customer_Ordering_ApproveOrder
                ),
                routerLink: ["/main/customer/ordering/approval"],
              },
              {
                label: "Confirm Order",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(
                  PagesEnum.Customer_Ordering_ConfirmOrder
                ),
                routerLink: ["/main/customer/ordering/confirmation"],
              },
              {
                label: "View Orders",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(
                  PagesEnum.Customer_Ordering_ViewOrders
                ),
                routerLink: ["/main/customer/ordering/view"],
              },
            ],
          },
          {
            label: "Reporting",
            icon: "pi pi-fw pi-cog",
            visible: this.IsParentPageVisible([
              PagesEnum.Customer_Reporting_CustomersVolume,
              PagesEnum.Customer_Reporting_DebtAgeAnalysis,
              PagesEnum.Customer_Reporting_ProductMix,
            ]),
            items: [
              {
                label: "Customers Volume",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(
                  PagesEnum.Customer_Reporting_CustomersVolume
                ),
                routerLink: ["/main/customer/reporting"],
              },
              {
                label: "Debt Age Analysis",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(
                  PagesEnum.Customer_Reporting_DebtAgeAnalysis
                ),
                routerLink: ["/main/customer/reporting"],
              },
              {
                label: "Product Mix",
                icon: "pi pi-fw pi-id-card",
                visible: this.IsPageVisible(
                  PagesEnum.Customer_Reporting_ProductMix
                ),
                routerLink: ["/main/customer/reporting"],
              },
            ],
          },
        ],
      },
    ];
  }

  LoadLoggedInUserRolePages() {
    let userRoles = this.authUserRoles as UserRole[];
    this.rolePages = [];
    userRoles.forEach((userRole) => {
      let pages = userRole.role.rolePages;
      this.rolePages.push(...pages);
    });
  }

  IsPageVisible(pageKey: number): boolean {
    let visible = false;
    this.rolePages.forEach((page) => {
      if (page) {
        if (+page == pageKey) visible = true;
      }
    });

    return visible;
  }

  IsParentPageVisible(pageKeys: number[]): boolean {
    let permission = this.rolePages.find((x) => pageKeys.find((y) => y == +x));

    return permission ? true : false;
  }

  get authUserProfile() {
    return this.getSessionStorageItem("userProfile");
  }

  get authUserRoles() {
    return this.getSessionStorageItem("userRoles");
  }

  getSessionStorageItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }
}
