import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutsService, Workout } from 'src/app/health/shared/services/workouts/workouts.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/app/store';

@Component({
  selector: 'workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {

  workouts$: Observable<Workout[]>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private store: Store

  ) { }

  ngOnInit() {            
    this.subscription = this.workoutsService.workouts$.subscribe();          
    this.workouts$ = this.store.select<Workout[]>('workouts');
    
  }
 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout){
    console.log(event)
    this.workoutsService.removeWorkout(event.id).then()
      .catch(e => {
        console.error(e);
      });
  }

}
