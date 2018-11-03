
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  message: string = '';
  token: string;

  constructor(private userService: UserService,
              private router: ActivatedRoute) {

              }

  ngOnInit() {


  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    debugger;

/** This plain javascript works the same way as the Angular way below to the the querystring
    var url = window.location.search;

    console.log(url);
*/
    this.token = this.router.snapshot.queryParamMap.get('token');
    console.log(this.token);
console.log(form.value.password);


    this.userService.resetPassword(form.value.password, this.token).subscribe(
      res => {
        console.log(res);
        this.message = 'Password reset successful!'
      },
      err => {console.log(err)
      this.message = 'Password failed: error: ' + err;
      });
    form.resetForm();/**/
    //this.sigup_done = true;
  }

  resetPassword(password: string) {
    console.log('password sent: ' + password);
  }

}
