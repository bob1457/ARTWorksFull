import { StateService } from './../../app-core/services/state.service';
import { element } from 'protractor';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'angular-6-social-login-v2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../app-core/services/message.service';
import { UserService } from '../user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  email: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // isLoggedIn: boolean = false;

  errMsg: string = '';
  user;
  email: string = '';
  loading: Boolean = false;

  fbUser;

  constructor( private http: HttpClient,
              private socialAuthService: AuthService,
              private router: Router,
              public dialog: MatDialog,
              private messageService: MessageService,
              private stateService: StateService,
              private userService: UserService) {
                if(this.userService.currentUserToken){
                  this.router.navigate(['/profile']);
                }
               }

  ngOnInit() {
  }

  /** Facebook Authentication */

  public facebookLogin() {
    console.log('login with Facebook!');
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
          console.log('user data returned on login: ' + userData);
          localStorage.setItem('token', userData.token);
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
                       this.messageService.setSocialLogin(true);

                       this.fbUser = data;
                       //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
                       //localStorage.setItem('token', JSON.stringify(data));
                       localStorage.setItem('token', this.fbUser.token);
                       console.log('new token: ' + this.fbUser.token);
                       console.log('social img' + this.fbUser.picture.data.url);

                       //Cache the facebook user data
                       localStorage.setItem('fbname', this.fbUser.name);
                       localStorage.setItem('fbemail', this.fbUser.email);
                       localStorage.setItem('fbimg', this.fbUser.picture.data.url);

                       console.log('Facebook token has been verified: ' + JSON.stringify(this.fbUser.token));
        }, onFail => {
                       //login was unsuccessful
                       //show an error message
                       //console.log(params);
                       console.log('error occurred');
               }
        );
  }




  // Local account login
  onSubmit(form: NgForm) {
    this.loading = true;
    console.log('login with local account!');
    debugger;
    console.log(form.value);  // form.value.xxxx
    this.userService.login(form.value)
      .subscribe(
        /*
        res => {
          if(!res.token){
            this.errMsg = "Authentication failed!";
          } else {
            //console.log(res); // including user data
            this.messageService.setLoggedIn(true);
            this.messageService.setSocialLogin(false);

            
            this.router.navigate(['/profile']);
          }
        },*/
        res => {
          if(!res.token){
            this.loading = false;
            this.errMsg = "Authentication failed!";
            console.log(this.errMsg);
          } else {
            this.messageService.setLoggedIn(true);
            this.messageService.setSocialLogin(false);

            //this.stateService.setUser(res.user);

            //localStorage.setItem('username', res.user.username);
            //localStorage.setItem('avatar', res.user.avatar);
            console.log(res);
            this.user = res.user;
            console.log(this.user);  
            
            this.router.navigate(['/profile']);
          }          
        },
        err => {
          console.log(err)
        }
      )
  }

  /** Open forgot password dialog */
  openDialog(): void {
    const dialogRef = this.dialog.open(ForgotPasswordDialog, {
      width: '450px',
      autoFocus: true,
      disableClose: true,
      data: {email: this.email/*, animal: this.animal*/}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      debugger;
      this.email = result;
      console.log('email entered: ' + this.email);
/**/      //send email
      this.userService.forgotPassword(this.email).subscribe(
        res => {console.log('email has been sent to ' + res)},
        err => {console.log('error occurred: ' + err)}
      )

    });


  }

}


// Modal dialog: forgot password
@Component({
  selector: 'forgot-password-dialog',
  templateUrl: 'forgot-password-dialog.html',
})
export class ForgotPasswordDialog {

  email: string;

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.email = data.email;
    }

    submitClick(): void {
      this.dialogRef.close(this.email);
    }

    sendMail(email): void {
      debugger;
      this.dialogRef.close(email);
    }

    cancelClick(): void {
      this.dialogRef.close();
    }

}
