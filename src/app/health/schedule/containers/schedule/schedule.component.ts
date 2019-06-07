import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ScheduleService, ScheduleItem } from 'src/app/health/shared/services/schedule/schedule.service';
import { Store } from 'src/app/store';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  
  open = false;

  date$: Observable<Date>;
  subscriptions: Subscription[] = [];
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;
  
  constructor(
    private scheduleService: ScheduleService,
    private store: Store,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) { }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.item$.subscribe(),
      this.workoutsService.workouts$.subscribe(),
      this.mealsService.meals$.subscribe()
    ];    
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date){
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any){    
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
}

}
