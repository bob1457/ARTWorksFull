import { StateService } from './../../app-core/services/state.service';
import { MessageService } from './../../app-core/services/message.service';
import { Data } from '@angular/router';
import { UserService } from './../user.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: IUser;
  currentUserSubscription: Subscription
  //userid: string = localStorage.getItem('username');
  serverUrl: string = 'http://localhost:5000'

  socialLogin: string;
  social: boolean;

  fbPicture: string;

  constructor(private userService: UserService,
              private messageService: MessageService,
              private stateService: StateService) { 
                debugger;
                
    /** subscribe to the changes of the observable (data strem) */
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user}      
    );
 /*   let userid = localStorage.getItem('username');
    this.userService.getUserProfile(userid).subscribe( profile => {
      this.user = profile; // make sure the server returns a correct result in json format, if not json, need set responseType
      console.log(this.user);
    });*/
    this.stateService.setUser(this.currentUser); // invoke the subscription - triggering the subscription in parent component (AppComponent)
  }

  ngOnInit() {
    console.log('profile comp initialized');
    debugger;
    this.socialLogin = localStorage.getItem('socialLogin');
    console.log('is social? ' + this.socialLogin);
    
    if(this.socialLogin != 'true'){
      this.social = false;
      let userid = localStorage.getItem('username');
      console.log(userid);
      /** 
      this.userService.getUserProfile(userid).subscribe( profile => {
        this.currentUser = profile; // make sure the server returns a correct result in json format, if not json, need set responseType
        console.log(this.currentUser);
      });*/
      //this.messageService.getLoginStatus();

    } else {
      this.social = true;
      this.fbPicture = localStorage.getItem('fbimg');
    }
    

    
    console.log(this.socialLogin);

  }

}