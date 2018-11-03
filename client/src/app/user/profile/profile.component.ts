import { Data } from '@angular/router';
import { UserService } from './../user.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: IUser;
  //userid: string = localStorage.getItem('username');
  serverUrl: string = 'http://localhost:5000'

  constructor(private userService: UserService) { }

  ngOnInit() {
    debugger;
    let userid: string = localStorage.getItem('username');
    this.userService.getUserProfile(userid).subscribe( profile => {
      profile = this.user = profile; // make sure the server returns a correct result in json format, if not json, need set responseType
      console.log(this.user);
    });
  }

}
