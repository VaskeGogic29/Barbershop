
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {}

  onRegister(form: NgForm) {
    if (form.valid) {
      const { name, surname, email, password } = form.value;
      this.authService.register(name, surname, email, password)
        .then((response) => {
          console.log('Registration successful:', response);
          this.router.navigateByUrl('/pocetna');
        })
        .catch((error) => {
          console.error('Registration error:', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
