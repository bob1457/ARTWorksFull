import { Injectable } from '@angular/core';
import { Subscription, Subject, Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { IUser } from '../../user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subjectLogin = new Subject<any>();

  //isSocialLogin: boolean;

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

              
/**
 * Application State 
 */
  setLoggedIn(value: boolean) {
    //this.isLoggedIn = loggedIn;
    //return this.isLoggedIn;
    this.subjectLogin.next({loggedIn: value});
    
    debugger;
    
    localStorage.setItem('loggedIn', value.toString());
    
    //return value;
  }
/** 
  updateUser(value: IUser) {
    this.subjectUser.next({user: value});

    //localStorage.setItem('avatar', value);
  }

  getUser():Observable<IUser> {
    return this.subjectUser.asObservable();
  }
*/
  setSocialLogin(value: boolean) {
    this.subjectLogin.next({socialLogin: value});
    localStorage.setItem('socialLogin', value.toString());
  }

  getLoginStatus(): Observable<any> {
    return this.subjectLogin.asObservable();
  }


  setFacebookUserData() {
    
  }

  /**
   * 
   */

}
