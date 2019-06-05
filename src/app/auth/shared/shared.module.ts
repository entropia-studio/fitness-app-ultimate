import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { AuthFormComponent } from './components/auth-form/auth-form.component';


// services
import { AuthService } from './services/auth/auth.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

// guards
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthFormComponent
  ],  
})
export class SharedModule {
  static forRoot() : ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    }
  }
}
