import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.isLoggedIn) {
      this.router.navigate(["login"]);
    }
    return this.isLoggedIn;
  }

  get isLoggedIn(): boolean {
    return this.token !== null && this.authUserProfile !== null;
  }

  get token() {
    return this.getSessionStorageItem("token");
  }

  getSessionStorageItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  get authUserProfile() {
    return this.getSessionStorageItem("userProfile");
  }
}
