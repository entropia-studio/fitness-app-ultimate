import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ScheduleService } from 'src/app/health/shared/services/schedule/schedule.service';
import { Store } from 'src/app/store';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  date$: Observable<Date>;
  subscriptions: Subscription[] = [];
  
  constructor(
    private scheduleService: ScheduleService,
    private store: Store
  ) { }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.subscriptions = [this.scheduleService.schedule$.subscribe()];    
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date){
    this.scheduleService.updateDate(date);
  }

}
