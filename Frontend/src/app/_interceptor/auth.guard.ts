import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  

  constructor(
    private router : Router,
  ){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = localStorage.getItem('CurrentUser');
      
      console.log("Auth gurd check curruser: ", currentUser);

        if (currentUser) {
           //this.currentUserData = JSON.parse(atob(localStorage.getItem('CurrentUser')));
  
            return true;
        }else{
            this.router.navigateByUrl('/login');
            return false;
        }
  }
  
}
