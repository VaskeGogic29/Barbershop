

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private adminEmail = 'admin29@gmail.com';  

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authService.logIn(email, password)
        .then((response) => {
          console.log('Login successful:', response);

          
          if (email === this.adminEmail) {
            this.router.navigateByUrl('/employee-management');
          } else {
            this.router.navigateByUrl('/pocetna');
          }

        })
        .catch((error) => {
          console.error('Login error:', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}

