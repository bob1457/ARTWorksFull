import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
  VkontakteLoginProvider,
} from "angular-6-social-login-v2";

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { getAuthServiceConfigs } from './socialloginConfig';
import { EqualValidatorDirective } from '../app-core/directives/equal.validator.directive';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    UserRoutingModule,
    SocialLoginModule//,
    //EqualValidatorDirective
  ],
  exports: [ProfileComponent],// LoginComponent, SignupComponent],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  declarations: [
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    UserHomeComponent,
    EqualValidatorDirective
  ]
})
export class UserModule { }
