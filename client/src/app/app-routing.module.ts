import { AboutComponent } from './about/about.component';
//  import { GalleryHomeComponent } from './gallery/gallery-home/gallery-home.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetStartedComponent } from './gallery/get-started/get-started.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  /*{ path: 'account', component: AccountHomeComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  },
  { path: 'gallery', component: GalleryHomeComponent,
    children: [
      { path: '', redirectTo: 'gallery', pathMatch: 'full' }     
    ] 
  }, */
  { path: 'get-started', component: GetStartedComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
