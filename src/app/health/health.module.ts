import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/shared/guards/auth.guard';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  { path: 'schedule' , canActivate: [AuthGuard], loadChildren: './schedule/schedule.module#ScheduleModule'},
  { path: 'meals' , canActivate: [AuthGuard], loadChildren: './meals/meals.module#MealsModule'},  
  { path: 'workout' , canActivate: [AuthGuard], loadChildren: './workout/workout.module#WorkoutModule'}  
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),            
    SharedModule.forRoot()
  ]
})
export class HealthModule { }
 