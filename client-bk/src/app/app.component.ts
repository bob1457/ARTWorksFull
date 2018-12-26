import { IUser } from './user/user.interface';
import { AuthService } from 'angular-6-social-login-v2';
import { MessageService } from './app-core/services/message.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription, Observable } from 'rxjs';
import { UserService } from './user/user.service';
import { StateService } from './app-core/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  avatarUrl: string;
  username: string;
  currentUser: any; // current user
  currentUserSubscription: Subscription;
  
  serverUrl: string = 'http://localhost:5000';

  public href = '';

  mode: string = 'side';
  opened: boolean = false; //true;

  NavDisplay: string;

  OpenButtonDisplay: string = 'none';

  //isLoggedIn: boolean = false;
  private loggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false' );
  private socialLogin = JSON.parse(localStorage.getItem('socialLogin'));
  //private currentUser = JSON.parse(localStorage.getItem('currentUser'));

  //message: any;
  //subscription: Subscription;

  constructor(private media: ObservableMedia,
              private router: Router,
              private messageService: MessageService,
              private stateService: StateService,
              private userService: UserService,
              private socialAuthService: AuthService) {

    this.media.subscribe((mediaChange: MediaChange) => {
      this.mode = this.getMode(mediaChange);
      // this.opened = this.getOpened(mediaChange);
      this.OpenButtonDisplay = this.showHideOpenButton(mediaChange,);
      this.NavDisplay = this.showHideNavBar(mediaChange,);
    });

    debugger;
    this.messageService.getLoginStatus().subscribe(message => {this.loggedIn = message} );
    
    //this.loggedIn = localStorage.getItem('loggedIn');
    //console.log('localstorage: ' + localStorage.getItem('loggedIn'));
    this.currentUserSubscription = this.stateService.getUserStatus().subscribe(x => this.currentUser = x)

    console.log('login status from app component: ' + this.loggedIn);

/*
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user
    })
*/

    
/*
    this.socialLogin = localStorage.getItem('socialLogin');

    if(this.socialLogin != "true") {
      this.userService.getUserProfile(userid).subscribe( profile => {
      profile = this.user = profile;
      console.log(this.user);

      //this.avatarUrl = this.serverUrl + '/avatars' + this.user.avatar;    
      //this.avatarUrl = localStorage.getItem('avatar'); 

      });
    } else {
      this.avatarUrl = localStorage.getItem('fbimg');
    }
*/
  }

  ngOnInit() {
        
    this.socialLogin = localStorage.getItem('socialLogin');
    console.log('social login: ' + this.socialLogin);
    //this.avatarUrl = localStorage.getItem('avatar');
    console.log('login status: ' + this.loggedIn);
    

    if(this.socialLogin != "true") {
      let userid = localStorage.getItem('username');
      /**
      this.userService.getUserProfile(userid).subscribe(profile => {
        this.currentUser = profile;
        console.log('profile: ' + this.currentUser);
      })
 */
      this.currentUserSubscription = this.stateService.getUserStatus().subscribe(x => this.currentUser = x)

    } else {
      
    }

    //this.avatarUrl = localStorage.getItem('avatar');
    //console.log(this.avatarUrl);
  }

  private getMode(mediaChange: MediaChange): string {
    // set mode based on a breakpoint
    if (this.media.isActive('gt-sm')) {
      return 'side';
    } else {
      return 'over';
    }
  }

  private getOpened(mediaChange: MediaChange): any {
    if (this.media.isActive('gt-sm')) {
      return 'false';
    } else {
      // this.show_logo = true;
      return 'true';
    }
  }

  private showHideOpenButton(mediaChange: MediaChange): string {
    if (this.media.isActive('gt-sm')) {
      return 'none'; // hidden
    } else {
      return ''; // show
    }

    // console.log()
  }

  private showHideNavBar(mediaChange: MediaChange): string {
    if (this.media.isActive('gt-sm')) {
      return ''; // hidden
    } else {
      return 'none'; // show
    }

    // console.log()
  }

  logout(){
    debugger;
    if(this.socialLogin == 'true'){
      this.socialAuthService.signOut();
    }

    this.messageService.setLoggedIn(false);
    localStorage.clear();
    /*
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('socialLogin');*/
    this.loggedIn = localStorage.getItem('loggedIn');
    
    this.router.navigate(['/']);
  }

}

