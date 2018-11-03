import { FlexLayoutModule } from '@angular/flex-layout';
import { AppCoreModule } from './app-core/app-core.module';
import { GalleryModule } from './gallery/gallery.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
// import { ToolbarComponent } from './app-core/toolbar/toolbar.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { ProfileComponent } from './user/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './app-core/banner/banner.component';

import { UserModule } from './user/user.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './app-core/helpers/jwt.interceptor';

// import {SlideshowModule} from 'ng-simple-slideshow';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // ToolbarComponent,
    //LoginComponent,
    //SignupComponent,
    //ProfileComponent,
    BannerComponent//,
    //AccountHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    AppCoreModule,
    GalleryModule,
    UserModule,
    FlexLayoutModule,    
    AppRoutingModule // Remember put this in theLAST line
    // ,
    // SlideshowModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
