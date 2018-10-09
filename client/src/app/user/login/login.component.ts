import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'angular-6-social-login-v2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor( private http: HttpClient,
              private socialAuthService: AuthService,
              private router: Router ) { }

  ngOnInit() {
  }

  /** Facebook Authentication */

  public facebookLogin() {
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        debugger;
          //this will return user data from facebook. What you need is a user token which you will send it to the server
          localStorage.setItem('fbtoken', userData.token);
          console.log('facebook login token: ' + localStorage.getItem('fbtoken'));
          console.log(userData);

          this.sendToRestApiMethod(userData.token); // It needs to verify the token on server side and get user data for server rest api
          this.router.navigate(['/user/profile']);
       }
    );
  }

  /** verify the facebook token on server side and generate new token/create user in local db for further authorization on rest api */
  sendToRestApiMethod(token: string) : void {
    let baseUrl = environment.apiBaseUrl;
    debugger;
    console.log('Call api for processing...');

    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'facebooktoken': token
    })
    // const params = new HttpParams().set('token', `${token}`);
    console.log(header);
    this.http.get(`http://localhost:5000/api/fb`, { headers: header })
        .subscribe(data => {
                       //login was successful

                       //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
                       //localStorage.setItem('token', data);

                       console.log('Facebook token has been verified: ' + data);
        }, onFail => {
                       //login was unsuccessful
                       //show an error message
                       //console.log(params);
                       console.log('error occured');
               }
        );
}





  // Local account login
  onSubmit(form: NgForm) {
    console.log(form);
  }

}
