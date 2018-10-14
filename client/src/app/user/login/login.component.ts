import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'angular-6-social-login-v2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../app-core/services/message.service';
import { UserService } from '../user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // isLoggedIn: boolean = false;

  errMsg: string = '';
  user;

  constructor( private http: HttpClient,
              private socialAuthService: AuthService,
              private router: Router,
              private messageService: MessageService,
              private userService: UserService ) { }

  ngOnInit() {
  }

  /** Facebook Authentication */

  public facebookLogin() {
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        debugger;
          //this will return user data from facebook. What you need is a user token which you will send it to the server
          /*localStorage.setItem('fbtoken', userData.token);
          console.log('facebook login token: ' + localStorage.getItem('fbtoken'));
          console.log(userData);
          this.isLoggedIn = true;
          this.login.emit(this.isLoggedIn);
          console.log(this.isLoggedIn);*/
          console.log(userData);
          //this.userService.setLoginStatus(true);
          // console.log(this.isLoggedIn);
          this.sendToRestApiMethod(userData.token); // It needs to verify the token on server side and get user data for server rest api
          this.router.navigate(['/profile']);
       }
    )
    .catch((error: any) => { console.log(error)});
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
                       
                       this.messageService.setLoggedIn(true);
                       //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
                       localStorage.setItem('token', JSON.stringify(data));

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
    debugger;
    console.log(form.value);  // form.value.xxxx
    this.userService.login(form.value)      
      .subscribe(
        res => {
          if(!res.token){
            this.errMsg = "Authentication failed!";
          } else {
            //console.log(res); // including user data
            this.messageService.setLoggedIn(true);
            this.user = res;
            console.log(this.user.userData);
            localStorage.setItem('token', JSON.stringify(res.token))
            //console.log(localStorage.getItem('token'));
            this.router.navigate(['/']);
          }
        },
        err => {          
          console.log(err)
        }
      )
  }

}
