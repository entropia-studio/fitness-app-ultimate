import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Store } from 'src/app/store';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map,tap, filter } from 'rxjs/operators';

export interface Workout {
  id: string,
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  uid: string,  
  $exists: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  private workoutsCollection: AngularFirestoreCollection<Workout>;  

  workouts$: Observable<Workout[]>;

  constructor(
    private store: Store,
    private db: AngularFirestore,
    private authService: AuthService
  ) {    

    this.workoutsCollection = this.db.collection<Workout>('workouts',
      ref => ref.where('uid','==',this.uid));
    
    
    this.workouts$ = this.workoutsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Workout;
        const id = a.payload.doc.id;    
        return { id, ...data };
      })
      ),tap(workouts => {                
        this.store.set('workouts',workouts);
      })
    )          
  }

  addWorkout(workout: Workout){
    workout.uid = this.uid;    
    return this.workoutsCollection.add(workout);
  }

  removeWorkout(id: string){        
    return this.workoutsCollection.doc(id).delete(); 
  }

  updateWorkout(id: string, workout: Workout){
    return this.workoutsCollection.doc(id).update(workout); 
  }

  getWorkout(id: string){    
    if (!id) return of({});    
    return this.store.select<Workout[]>('workouts')
      .pipe(
        filter(Boolean),
        map((workouts: any[]) => workouts.find((workout: Workout) => workout.id === id)
       )
      )
  }

  get uid(){
    return this.authService.user.uid;
  }

}



