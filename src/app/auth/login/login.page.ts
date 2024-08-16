import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // onLogIn(form: NgForm){
  //   console.log(form);
  //   this.authService.logIn();
  //   this.router.navigateByUrl('/pocetna');
  // }

  onLogIn(form: NgForm) {
    if (form.valid) {
      console.log('Form is valid:', form.value);
      this.authService.logIn();
      this.router.navigateByUrl('/pocetna');
    } else {
      console.log('Form is invalid');
      // Optionally, you can add code here to highlight invalid fields or display an error message
    }
  }



}


