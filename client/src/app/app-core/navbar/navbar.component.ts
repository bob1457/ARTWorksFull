import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { UserService } from '../../user/user.service';
import { AuthService } from 'angular-6-social-login-v2';
import { IUser } from '../../user/user.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public href = '';

  serverUrl: string = environment.apiBaseUrl; // 'http://localhost:5000';

  avatarUrl: string;

  user: IUser;
  mode: string = 'side';
  opened: boolean = false; //true;

  NavDisplay: string;

  OpenButtonDisplay: string = 'none';


  private loggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false' );
  private socialLogin = JSON.parse(localStorage.getItem('socialLogin'));


  constructor(private media: ObservableMedia,
    private router: Router,
    private messageService: MessageService,
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
      //this.messageService.getUser().subscribe(user => this.user = user);
    }

  ngOnInit() {
debugger;
    this.socialLogin = localStorage.getItem('socialLogin');
    this.avatarUrl = localStorage.getItem('avatar');

    let userid = localStorage.getItem('username');
      console.log('username obtained: ' + userid);
      this.userService.getUserProfile(userid).subscribe( profile => {
        this.user = profile; // make sure the server returns a correct result in json format, if not json, need set responseType
        console.log(this.user);
      });

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




  /** Private Implementation */

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

}
