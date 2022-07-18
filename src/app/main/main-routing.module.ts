import { MainComponent } from "./main.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [{ path: "", redirectTo: "profile", pathMatch: "full" }],
  },
  {
    path: "",
    redirectTo: "main/profile",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
