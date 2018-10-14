import { Injectable } from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();

  // isLoggedIn: boolean;

  constructor() { }
/**/
  setLoggedIn(value: boolean) {
    //this.isLoggedIn = loggedIn;
    //return this.isLoggedIn;
    this.subject.next({loggedIn: value});
    // debugger;
    localStorage.setItem('loggedIn', value.toString());    
  }

  getLoginStatus(): Observable<any> {
    return this.subject.asObservable();
  }


}
