import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.page.html',
  styleUrls: ['./pocetna.page.scss'],
})
export class PocetnaPage {
  
  constructor(private router: Router, private authService: AuthService) {}

  navigateToZaposleni() {
    this.router.navigateByUrl('/zaposleni');
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  onLogout() {
    this.authService.logOut();
  }
}