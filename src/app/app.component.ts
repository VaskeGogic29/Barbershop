import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.checkIfAdmin();
  }

  onLogout() {
    this.authService.logOut();
  }

  checkIfAdmin() {
    const userEmail = localStorage.getItem('userEmail');
    console.log('Stored user email:', userEmail);
    this.isAdmin = userEmail === 'admin29@gmail.com';
    console.log('Is admin:', this.isAdmin);
  }
  


}




