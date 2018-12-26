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
  loading: boolean = false;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    //console.log(form.value);
    debugger;
    /**/this.userService.register(form.value).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.message = 'Signup successful!'
      },
      err => {console.log(err)
      this.message = 'Signup failed: error: ' + err;
      this.loading = false;
      });
    form.resetForm();
    this.sigup_done = true;
  }
}
