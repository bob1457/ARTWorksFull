import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  message: string = '';
  sigup_done: boolean = false;
  link: string = '<a href="/login">Login now</a>';

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    debugger;
    /**/this.userService.register(form.value).subscribe(
      res => {
        console.log(res);
        this.message = 'Signup successful!'
      },
      err => {console.log(err)
      this.message = 'Signup failed: error: ' + err;
      });
    form.resetForm();
    this.sigup_done = true;
  }
}
