import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IUser } from '../../user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private subjectUser = new Subject<any>();
  private subjectSocialUser = new Subject<any>();
  //private currentUser =

  constructor() { }

  setUser(value: any) {
    this.subjectUser.next(value);
    localStorage.setItem('user', value)
  }

  getUserStatus() {
    return this.subjectUser;
  }

  setSocialUser(value: any){
    this.subjectSocialUser.next(value);
  }

  getSocialUser() {
    return this.subjectSocialUser;
  }
}
