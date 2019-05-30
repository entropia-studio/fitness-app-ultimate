import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RegisterComponent } from './containers/register/register.component';

const routes: Routes = [
  { path: '' , component: RegisterComponent}
];

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RegisterModule { }
