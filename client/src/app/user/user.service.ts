import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

declare const FB:any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
    

}
