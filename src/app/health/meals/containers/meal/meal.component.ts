import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {
  
  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {          
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.mealsService.getMeal(params.get('id')))      
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async addMeal(event: Meal){
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  async updateMeal(event: Meal){
   const id = this.route.snapshot.params.id;
   await this.mealsService.updateMeal(id,event);
   this.backToMeals();
  }

  async removeMeal(event: Meal){
   const id = this.route.snapshot.params.id;
   await this.mealsService.removeMeal(id);
   this.backToMeals();
  }

  backToMeals(){
    this.router.navigate(['meals']);
  }

}

