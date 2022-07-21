import { DashboardComponent } from "./main/dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AppMainComponent } from "./app.main.component";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { AppErrorComponent } from "./pages/app.error.component";
import { AppAccessdeniedComponent } from "./pages/app.accessdenied.component";
import { AppLoginComponent } from "./pages/app.login.component";
import { AuthGuard } from "./guards/auth.guard";
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: "",
          component: AppMainComponent,
          children: [
            { path: "", redirectTo: "main", pathMatch: "full" },
            {
              path: "main",
              canActivate: [AuthGuard, AngularFireAuthGuard],
              data: { authGuardPipe: redirectUnauthorizedToLogin },
              loadChildren: () =>
                import("./main/main.module").then((m) => m.MainModule),
            },
          ],
        },
        { path: "error", component: AppErrorComponent },
        { path: "accessdenied", component: AppAccessdeniedComponent },
        { path: "notfound", component: AppNotfoundComponent },
        {
          path: "login",
          component: AppLoginComponent,
        },
        { path: "**", redirectTo: "/notfound" },
      ],
      { scrollPositionRestoration: "enabled" }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
