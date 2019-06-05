import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Store } from 'src/app/store';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map,tap, filter } from 'rxjs/operators';

export interface Meal {
  id: string,
  name: string,
  ingredients: string[],
  timestamp: number,
  uid: string,  
  $exists: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  private mealsCollection: AngularFirestoreCollection<Meal>;  

  meals$: Observable<Meal[]>;

  constructor(
    private store: Store,
    private db: AngularFirestore,
    private authService: AuthService
  ) {    

    this.mealsCollection = this.db.collection<Meal>('meals',
      ref => ref.where('uid','==',this.uid));
    
    
    this.meals$ = this.mealsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Meal;
        const id = a.payload.doc.id;    
        return { id, ...data };
      })
      ),tap(meals => {                
        this.store.set('meals',meals);
      })
    )          
  }

  addMeal(meal: Meal){
    meal.uid = this.uid;    
    return this.mealsCollection.add(meal);
  }

  removeMeal(id: string){        
    return this.mealsCollection.doc(id).delete(); 
  }

  updateMeal(id: string, meal: Meal){
    return this.mealsCollection.doc(id).update(meal); 
  }

  getMeal(id: string){    
    if (!id) return of({});    
    return this.store.select<Meal[]>('meals')
      .pipe(
        filter(Boolean),
        map(meals => meals.find((meal: Meal) => meal.id === id)
       )
      )
  }

  get uid(){
    return this.authService.user.uid;
  }

}


