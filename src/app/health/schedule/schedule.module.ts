import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';

const routes: Routes = [
  {path: '', component: ScheduleComponent}
];

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleDaysComponent,
    ScheduleControlsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class ScheduleModule { }
