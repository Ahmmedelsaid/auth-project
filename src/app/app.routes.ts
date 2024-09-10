import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

export const routes: Routes = [
    {path:'', component:LoginComponent},
    {path:'reset', component:ForgotPasswordComponent},
    {path:'**', component:LoginComponent},
];
