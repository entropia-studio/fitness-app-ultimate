import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnChanges {
  
  toggled: Boolean = false;
  exists: Boolean = false;

  @Output()
  create = new EventEmitter<Workout>(); 

  @Output()
  update = new EventEmitter<Workout>(); 

  @Output()
  remove = new EventEmitter<Workout>(); 

  @Input()
  workout: Workout;

  form = this.fb.group({
    name: ['',Validators.required],
    type: ['strength'],
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.workout && this.workout.name){
      this.exists= true;
    }    
    const value = this.workout;
    this.form.patchValue(value);
  }

  createWorkout(){
    if (this.form.valid){
      this.create.emit(this.form.value);
    }
  }

  updateWorkout(){
    if (this.form.valid){
      this.update.emit(this.form.value);
    }
  }

  removeWorkout(){
    if (this.form.valid){
      this.remove.emit(this.form.value);
    }
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

  get placeholder(){
    return `
      e.g. ${this.form.get('type').value === 'strength' ? 'Benchpress' : 'Treadmill'}
    `;
  }
}
