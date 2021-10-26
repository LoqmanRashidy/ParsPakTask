import { Injectable, Inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Data,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';


import { AuthService } from './auth.service';
import { AuthGuardPermission } from '../../models/interfaces/auth-types';
import { Globals } from '../../../shared/helper/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  private permissionObjectKey = 'permission';

  constructor(private authService: AuthService, private router: Router, 
    @Inject(Globals) public global: Globals,) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const currentUser = this.authenticationService.currentUserValue;
//     if (currentUser) {
//         // authorised so return true
//         return true;
//     }
//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
//     return false;
// }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const permissionData = route.data[this.permissionObjectKey] as AuthGuardPermission;
    const returnUrl = state.url;
    const activate = this.hasAuthUserAccessToThisRoute(permissionData, returnUrl);
    //if(activate && typeof this.global.user == 'function') this.global.user(this.authService.getAuthUser());
    if(activate && this.global.user != null) this.global.user(this.authService.getAuthUser());
    return activate;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const permissionData = childRoute.data[this.permissionObjectKey] as AuthGuardPermission;
    const returnUrl = state.url;
    const activateChild = this.hasAuthUserAccessToThisRoute(permissionData, returnUrl);
    return activateChild;
  }

  canLoad(route: Route): boolean {
    if (route.data) {
      const permissionData = route.data[this.permissionObjectKey] as AuthGuardPermission;
      const returnUrl = `/${route.path}`;
      return this.hasAuthUserAccessToThisRoute(permissionData, returnUrl);
    } else {
      return true;
    }
  }

  private hasAuthUserAccessToThisRoute(permissionData: Data, returnUrl: string): boolean {
    if (!this.authService.isAuthUserLoggedIn()) {
      this.showAccessDenied(returnUrl);
      return false;
    }

    if (!permissionData) {
      return true;
    }

    if (Array.isArray(permissionData.deniedRoles) && Array.isArray(permissionData.permittedRoles)) {
      throw new Error('Donot set both \'deniedRoles\' and \'permittedRoles\' in route data.');
    }

    if (Array.isArray(permissionData.permittedRoles)) {
      const isInRole = this.authService.isAuthUserInRoles(permissionData.permittedRoles);
      if (isInRole) {
        return true;
      }

      this.showAccessDenied(returnUrl);
      return false;
    }

    if (Array.isArray(permissionData.deniedRoles)) {
      const isInRole = this.authService.isAuthUserInRoles(permissionData.deniedRoles);
      if (!isInRole) {
        return true;
      }

      this.showAccessDenied(returnUrl);
      return false;
    }

    return true;
  }

  private showAccessDenied(returnUrl: string) {
    //this.router.navigate(['/accessDenied'], { queryParams: { returnUrl: returnUrl } });    
    //this.router.navigate(['/p404p'], { queryParams: { returnUrl: returnUrl } });
    
    
    
    // first remove current user login info then route to home
    this.router.navigate(['/base'], { queryParams: { returnUrl: returnUrl } });
  }
}
