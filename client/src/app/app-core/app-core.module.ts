import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BannerComponent } from './banner/banner.component';



@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule
  ],
  exports: [ToolbarComponent, SidenavComponent],
  declarations: [ToolbarComponent, SidenavComponent]
})
export class AppCoreModule { }
