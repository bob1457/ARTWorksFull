import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  imageURLs = [
    "url('../../../assets/images/banner-painting.jpg')", 
    "url('../../../assets/images/b1.jpg)'",
    "url('../../../assets/images/b2.jpg)'",
    "url('../../../assets/images/b3.jpg)'",
    "url('../../../assets/images/b4.jpg)'",
    "url('../../../assets/images/b5.jpg) '"
  ];

  constructor() { }

  getImageTag() {
    var img = '<img src=\"';
    var randomIndex = Math.floor(Math.random() * this.imageURLs.length);
    img += this.imageURLs[randomIndex];
    img += '\" alt=\"Some alt text\"/>';
    return img;
  }

  getImageUrl() {

    var image:string ="";
    var randomIndex = Math.floor(Math.random() * 6);
    console.log(randomIndex);
    image = this.imageURLs[randomIndex];
    console.log(image);
    return image;
    
  }

  ngOnInit() {
  }

}
