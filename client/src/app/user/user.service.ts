import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: string;

  //private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false' );
  private baseUrl = environment.apiBaseUrl;



  constructor(private http: HttpClient) { }
/*
  setLoginStatus(value: boolean){
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', value.toString());
  }

  get isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }
*/

  register(user){
   // debugger;
    console.log(user);
    return this.http.post(`${this.baseUrl}/api/register`, user);
  }

  login(user):Observable<any>{
    console.log(user);
    return this.http.post<any>(`${this.baseUrl}/api/login`, user);
    /*.pipe(
      map(res => {
        if(res && res.token){
          localStorage.setItem('token', JSON.stringify(res.token));
          console.log(localStorage.getItem('token'));

        }
      })
    ) */
  }

  forgotPassword(email): Observable<any> {
    console.log('email sent to: ' + email);
    return this.http.post<any>(`${this.baseUrl}/api/user/forgotpw`, {"email": email});
  }

  resetPassword(password, token): Observable<any> {
    debugger;
    console.log('new password sent to: ' + password);
    return this.http.post<any>(`${this.baseUrl}/api/user/resetpw`, {'password': password, token: token});
  }

  getUserProfile(username: string): Observable<IUser> {    
    return this.http.get<IUser>(`${this.baseUrl}/api/user/${username}`);
  }

  public get currentUserValue() {
    debugger;
    
    //return this.currentUserSubject.value;
    return this.currentUser = localStorage.getItem('token');
  }


}
