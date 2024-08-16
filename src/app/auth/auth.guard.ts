import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // // Replace this with your actual authentication check
    // const isAuthenticated = false; 

    if (!this.authService.isUserAuthenticated) {
      
      this.router.navigate(['/login']);
    }
    

    return this.authService.isUserAuthenticated;
  }
}