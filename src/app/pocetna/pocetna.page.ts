import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.page.html',
  styleUrls: ['./pocetna.page.scss'],
})
export class PocetnaPage {
  
  constructor(private router: Router) {}

  navigateToZaposleni() {
    this.router.navigateByUrl('/zaposleni');
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
}