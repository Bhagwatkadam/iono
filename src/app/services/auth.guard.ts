import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
// import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
  	private authService: AuthService,
  	private router : Router
    ){}
    canActivate() {
      // if(this.cookieService.get('loginResponce')){
      //   return true;
      // }else{
      //   this.router.navigate(['/client-login']);
      //   return false;
      // } 
      return true;
    }

    // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //   return this.authService.isLoggedIn.pipe(
    //     take(1),
    //     map((isLoggedIn: boolean) => {
    //       if (!isLoggedIn) {
    //         this.router.navigate(['/client-login']);
    //         return false;
    //       }
    //       this.router.navigate(['/Dashboard']);
    //       return true;
    //     })
    //   );
    // }

}
