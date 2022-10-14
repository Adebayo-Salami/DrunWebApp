import { CustomerOrderViewComponent } from "./customer/customer-ordering/customer-order-view/customer-order-view.component";
import { CustomerOrderApprovalComponent } from "./customer/customer-ordering/customer-order-approval/customer-order-approval.component";
import { ProductSetupComponent } from "./setup/product-setup/product-setup.component";
import { RoleSetupComponent } from "./setup/role-setup/role-setup.component";
import { CustomerReportingComponent } from "./customer/customer-reporting/customer-reporting.component";
import { CustomerOrderingComponent } from "./customer/customer-ordering/customer-ordering.component";
import { CustomerOnboardingComponent } from "./customer/customer-onboarding/customer-onboarding.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainComponent } from "./main.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserRoleSetupComponent } from "./setup/user-role-setup/user-role-setup.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "setup/role", component: RoleSetupComponent },
      { path: "setup/user-role", component: UserRoleSetupComponent },
      { path: "setup/product", component: ProductSetupComponent },
      { path: "customer/onboarding", component: CustomerOnboardingComponent },
      { path: "customer/ordering", component: CustomerOrderingComponent },
      {
        path: "customer/ordering/approval",
        component: CustomerOrderApprovalComponent,
      },
      {
        path: "customer/ordering/view",
        component: CustomerOrderViewComponent,
      },
      { path: "customer/reporting", component: CustomerReportingComponent },
    ],
  },
  {
    path: "",
    redirectTo: "main/dashboard",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
