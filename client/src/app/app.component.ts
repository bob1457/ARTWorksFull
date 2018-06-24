import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public href = '';

  mode: string = 'side';
  opened: boolean = false; //true;

  NavDisplay: string;

  OpenButtonDisplay: string = 'none';


  constructor(private media: ObservableMedia, private router: Router) {
    this.href = this.router.url;
    console.log('The current URL: ' + this.href);

    this.media.subscribe((mediaChange: MediaChange) => {
      this.mode = this.getMode(mediaChange);
      // this.opened = this.getOpened(mediaChange);
      this.OpenButtonDisplay = this.showHideOpenButton(mediaChange,);
      this.NavDisplay = this.showHideNavBar(mediaChange,);
    });
  }

  ngOnInit() {
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

}
