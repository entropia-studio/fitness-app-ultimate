import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnChanges {
  
  toggled: Boolean = false;
  exists: Boolean = false;

  @Output()
  create = new EventEmitter<Meal>(); 

  @Output()
  update = new EventEmitter<Meal>(); 

  @Output()
  remove = new EventEmitter<Meal>(); 

  @Input()
  meal: Meal;

  form = this.fb.group({
    name: ['',Validators.required],
    ingredients: this.fb.array([''])
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.meal && this.meal.name){
      this.exists= true;
    }
    this.emptyIngredients();

    const value = this.meal;
    this.form.patchValue(value);

    if (value.ingredients){      
      for(const item of value.ingredients){
        this.ingredients.push(new FormControl(item));
      }
    }
  }

  createMeal(){
    if (this.form.valid){
      this.create.emit(this.form.value);
    }
  }

  updateMeal(){
    if (this.form.valid){
      this.update.emit(this.form.value);
    }
  }

  removeMeal(){
    if (this.form.valid){
      this.remove.emit(this.form.value);
    }
  }

  addIngredient(){
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number){
    this.ingredients.removeAt(index);
  }

  emptyIngredients(){
    while(this.ingredients.length){
      this.ingredients.removeAt(0);
    }
  }
  
  get ingredients(){
    return this.form.get('ingredients') as FormArray;
  }
  
  get required(){
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  toggle(){
    this.toggled = !this.toggled;
  }
}
