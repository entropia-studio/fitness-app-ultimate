import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// third-party module
import { AngularFirestoreModule } from '@angular/fire/firestore';

// components
import { ListItemComponent } from './components/list-item/list-item.component';

// services
import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';
import { ScheduleService } from './services/schedule/schedule.service';

// pipes
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';


@NgModule({
  declarations: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularFirestoreModule
  ],
  exports: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService,
        ScheduleService
      ]
    }
  }
}
