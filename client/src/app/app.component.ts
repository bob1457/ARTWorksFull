import { IUser } from './user/user.interface';
import { AuthService } from 'angular-6-social-login-v2';
import { MessageService } from './app-core/services/message.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  avatarUrl: string = '';
  username: string = '';
  user: IUser;

  serverUrl: string = 'http://localhost:5000';

  public href = '';

  mode: string = 'side';
  opened: boolean = false; //true;

  NavDisplay: string;

  OpenButtonDisplay: string = 'none';

  //isLoggedIn: boolean = false;
  private loggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false' );
  private socialLogin = JSON.parse(localStorage.getItem('socialLogin'));

  //message: any;
  subscription: Subscription;


  constructor(private media: ObservableMedia,
              private router: Router,
              private messageService: MessageService,
              private userService: UserService,
              private socialAuthService: AuthService) { //private messageService: MessageService
    this.href = this.router.url;
    // console.log('The current URL: ' + this.href);

    this.media.subscribe((mediaChange: MediaChange) => {
      this.mode = this.getMode(mediaChange);
      // this.opened = this.getOpened(mediaChange);
      this.OpenButtonDisplay = this.showHideOpenButton(mediaChange,);
      this.NavDisplay = this.showHideNavBar(mediaChange,);
    });

/**/
    debugger;
    this.subscription = this.messageService.getLoginStatus().subscribe(message => {this.loggedIn = message} );
    this.loggedIn = localStorage.getItem('loggedIn');
    console.log('localstorage: ' + localStorage.getItem('loggedIn'));

    console.log('status property: ' + this.loggedIn);

  }

  ngOnInit() {

    let userid = localStorage.getItem('username');
    //debugger;// subscribe the login event
    //this.subscription = this.userService.isLoggedIn().subscribe(message => {this.loggedIn = message} );
    this.loggedIn = localStorage.getItem('loggedIn');
    this.socialLogin = localStorage.getItem('socialLogin');
    //this.avatarUrl = localStorage.getItem('avatar');

    this.userService.getUserProfile(userid).subscribe( profile => {
      profile = this.user = profile;
      console.log(this.user);
    });

    this.username = localStorage.getItem('username');
    console.log(this.avatarUrl);
    console.log('localstorage: ' + localStorage.getItem('loggedIn'));
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
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    this.loggedIn = localStorage.getItem('loggedIn');
    this.router.navigate(['/']);
  }

}

