import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const FB:any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

}
