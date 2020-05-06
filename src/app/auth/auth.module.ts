import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    AngularFireAuthModule,
    SharedModule
  ],
  entryComponents: [LoginComponent, SignupComponent],
})
export class AuthModule {}
