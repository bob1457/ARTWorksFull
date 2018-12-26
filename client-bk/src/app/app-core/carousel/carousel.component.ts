import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  imageUrls = [
    { url: '../../../assets/images/1.jpg', caption: 'The first slide', href: '#config' },
    { url: '../../../assets/images/2.jpg' },
    { url: '../../../assets/images/3.jpg' },
    { url: '../../../assets/images/4.jpg' },
    { url: '../../../assets/images/5.jpg', caption: 'Apple TV', href: 'https://www.apple.com/' },
    '../../../assets/images/6.jpg'
    ];
    /*

    { url: '../../../assets/images/1.jpg'}, // caption: 'The first slide', href: '#config' },
    { url: '../../../assets/images/2.jpg' },
    { url: '../../../assets/images/3.jpg'},// caption: 'Apple TV', href: 'https://www.apple.com/' },
    { url: '../../../assets/images/4.jpg'},
    { url: '../../../assets/images/6.jpg'},
    './../../assets/images/5.jpg.jpg'

     */
    height: string = '400px';
    minHeight: string;
    arrowSize: string = '30px';
    showArrows: boolean = true;
    disableSwiping: boolean = false;
    autoPlay: boolean = true;
    autoPlayInterval: number = 10000;
    stopAutoPlayOnSlide: boolean = true;
    debug: boolean = false;
    backgroundSize: string = 'cover';
    backgroundPosition: string = 'center center';
    backgroundRepeat: string = 'no-repeat';
    showDots: boolean = true;
    dotColor: string = '#FFF';
    showCaptions: boolean = true;
    captionColor: string = '#FFF';
    captionBackground: string = 'rgba(0, 0, 0, .35)';
    lazyLoad: boolean = false;
    width: string = '100%';

    ngOnInit() {
    // adding an image url dynamically.
      setTimeout(() => {
      // console.log('adding an image url dynamically.');
      //this.imageUrls.push('https://cdn-images-1.medium.com/max/2000/1*Nccd2ofdArlXF7v58UK94Q.jpeg');
    }, 5000);
    /*
    console.log(`
                                  /   \\
      _                        )      ((   ))     (
      (@)                      /|\\      ))_((     /|\\
      |-|                     / | \\    (/\\|/\\)   / | \\                      (@)
      | | -------------------/--|-voV---\`|'/---Vov-|--\\---------------------|-|
      |-|                         '^\`   (o o)  '^\`                          | |
      | |                               \`\\Y/'                               |-|
      |-|                                                                   | |
      | |                                Hey                                |-|
      |-|                                                                   | |
      | |                                                                   |-|
      |_|___________________________________________________________________| |
      (@)              l   /\\ /         ( (       \\ /\\   l                \`\\|-|
                      l /   V           \\ \\       V   \\ l                  (@)
                      l/                _) )_          \\I
                                        \`\\ /'
                                  \`
    `);
    */
  }

}
