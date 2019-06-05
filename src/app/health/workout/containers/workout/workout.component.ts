import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {
  
  workout$: Observable<Workout>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {          
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.workoutsService.getWorkout(params.get('id')))      
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async addWorkout(event: Workout){
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout){
   const id = this.route.snapshot.params.id;
   await this.workoutsService.updateWorkout(id,event);
   this.backToWorkouts();
  }

  async removeWorkout(event: Workout){
   const id = this.route.snapshot.params.id;
   await this.workoutsService.removeWorkout(id);
   this.backToWorkouts();
  }

  backToWorkouts(){
    this.router.navigate(['workout']);
  }

}

