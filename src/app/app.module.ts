import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// features modules
import { AuthModule } from './auth/auth.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
