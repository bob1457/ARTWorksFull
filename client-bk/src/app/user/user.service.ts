import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from './user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  public token: string;

  //private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false' );
  private baseUrl = environment.apiBaseUrl; //'http://localhost:58088'; // 



  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Ref: http://jasonwatmore.com/post/2018/06/25/angular-6-communicating-between-components-with-observable-subject
  // Ref: http://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial

/*
  setLoginStatus(value: boolean){
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', value.toString());
  }

  get isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }
*/

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  register(user){
   // debugger;
    console.log(user);
    return this.http.post(`${this.baseUrl}/api/register`, user);
  }

  login(user):Observable<any>{
    console.log(user);
    return this.http.post<any>(`${this.baseUrl}/api/login`, user)//;
    /**/.pipe(
      map(res => {
        if(res && res.token){
          localStorage.setItem('token', res.token);
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          this.currentUserSubject.next(res.user);

          console.log(localStorage.getItem('token'));

        }

        return res;
      })
    ) 
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

  public get currentUserToken() {
    debugger;
    
    //return this.currentUserSubject.value;
    return this.token = localStorage.getItem('token');
  }
/*
  getSocialUser() : Observable<any> {
    return 
  }
*/

}
