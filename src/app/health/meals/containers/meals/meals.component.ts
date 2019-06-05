import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealsService, Meal } from 'src/app/health/shared/services/meals/meals.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/app/store';

@Component({
  selector: 'meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private store: Store

  ) { }

  ngOnInit() {            
    this.subscription = this.mealsService.meals$.subscribe();          
    this.meals$ = this.store.select<Meal[]>('meals');
    
  }
 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  removeMeal(event: Meal){
    console.log(event)
    this.mealsService.removeMeal(event.id).then()
      .catch(e => {
        console.error(e);
      });
  }

}
