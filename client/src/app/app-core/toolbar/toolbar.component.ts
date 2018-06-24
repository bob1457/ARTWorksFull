import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  mode: string = 'side';
  opened: boolean = false; //true;

  OpenButtonDisplay: string = 'none';

  constructor(private media: ObservableMedia,private router: Router) {
      /**/this.media.subscribe((mediaChange: MediaChange) => {
      this.mode = this.getMode(mediaChange);
      this.opened = this.getOpened(mediaChange);
      this.OpenButtonDisplay = this.showHideOpenButton(mediaChange,);
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

}
