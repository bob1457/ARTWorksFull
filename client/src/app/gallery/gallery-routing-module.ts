// import { GalleryHomeComponent } from './gallery-home/gallery-home.component';
// import { HomeComponent } from '../home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AboutComponent } from '../about/about.component';
/*import { ImgListComponent } from './img-list/img-list.component';*/
import { GalleryWelcomeComponent } from './gallery-welcome/gallery-welcome.component';
import { GalleryHomeComponent } from './gallery-home/gallery-home.component';
import { GetStartedComponent } from './get-started/get-started.component';


const routes: Routes = [
  /**/
  { path: 'gallery', component: GalleryHomeComponent,
    children: [
      { path: '', redirectTo: 'gallery', pathMatch: 'full' } // ,
      //{ path: 'get-started', component: GetStartedComponent, outlet:"gallery" }
    ] 
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
