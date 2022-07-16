import { Component, OnDestroy } from "@angular/core";
import { BreadcrumbService } from "./breadcrumb.service";
import { Subscription } from "rxjs";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./app.breadcrumb.component.html",
})
export class AppBreadcrumbComponent implements OnDestroy {
  subscription: Subscription;
  items: MenuItem[];
  message: string;
  home: MenuItem;

  constructor(public breadcrumbService: BreadcrumbService) {
    this.subscription = breadcrumbService.itemsHandler.subscribe((response) => {
      this.items = response;
    });

    this.message = this.getTimeOfDay();

    this.home = { label: "   Home", icon: "pi pi-home", routerLink: "/" };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTimeOfDay(): string {
    const now = new Date();
    const hour = now.getHours();

    let shift = "Good ";
    shift += hour >= 4 && hour <= 11 ? "Morning" : "";
    shift += hour >= 12 && hour <= 16 ? "Afternoon" : "";
    shift += hour >= 17 && hour <= 20 ? "Evening" : "";
    shift += hour >= 21 || hour <= 3 ? "Evening" : "";
    return shift;
  }
}
