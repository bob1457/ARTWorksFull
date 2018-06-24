// import { GalleryHomeComponent } from './gallery-home/gallery-home.component';
// import { HomeComponent } from '../home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AboutComponent } from '../about/about.component';
import { ImgListComponent } from './img-list/img-list.component';


const routes: Routes = [
  { path: '', component: ImgListComponent, outlet:"gallery" }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
