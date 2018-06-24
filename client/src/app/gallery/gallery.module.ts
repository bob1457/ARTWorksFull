import { AppMaterialModule } from './../app-material/app-material.module';
import { GalleryRoutingModule } from './gallery-routing-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryHomeComponent } from './gallery-home/gallery-home.component';
import { AppCoreModule } from '../app-core/app-core.module';
// import { ToolbarComponent } from '../app-core/toolbar/toolbar.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { CarouselComponent } from '../app-core/carousel/carousel.component';
import { ImgListComponent } from './img-list/img-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GalleryWelcomeComponent } from './gallery-welcome/gallery-welcome.component';



@NgModule({
  imports: [
    CommonModule,
    AppCoreModule,
    AppMaterialModule,
    GalleryRoutingModule,
    SlideshowModule,
    FlexLayoutModule
    
  ],
  declarations: [GalleryHomeComponent, CarouselComponent, ImgListComponent, GalleryWelcomeComponent], // , ToolbarComponent],
  exports: [
    GalleryHomeComponent,
    SlideshowModule
  ]
})
export class GalleryModule { }

