import { Injectable } from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();

  //isSocialLogin: boolean;

  constructor() { }
/**/
  setLoggedIn(value: boolean) {
    //this.isLoggedIn = loggedIn;
    //return this.isLoggedIn;
    this.subject.next({loggedIn: value});
    // debugger;
    localStorage.setItem('loggedIn', value.toString());
  }

  setSocialLogin(value: boolean) {
    this.subject.next({socialLogin: value});
    localStorage.setItem('socialLogin', value.toString());
  }

  getLoginStatus(): Observable<any> {
    return this.subject.asObservable();
  }


}
