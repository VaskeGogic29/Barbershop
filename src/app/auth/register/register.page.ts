import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    if (form.valid) {
      console.log('Registration Successful', form.value);
      //srediti logiku kad se poveze na bazu
      this.router.navigateByUrl('/pocetna');
    } else {
      console.log('Form is invalid');
    }
  }

}

