import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap, map, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { Store } from 'src/app/store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';

export interface ScheduleItem {
  id?: string,
  meals: Meal[],  
  workouts: Workout[],
  section: string,
  timestamp: number,
  uid?: string,
  $key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());
  private scheduleCollection: AngularFirestoreCollection<ScheduleItem>;  
  private section$ = new Subject();
  private itemList$ = new Subject();  

  item$ = this.itemList$
    .pipe(
      withLatestFrom(this.section$),
      map(([items, section] : any[]) => {
        const id = section.data.id;

        const defaults : ScheduleItem = {
          workouts: null,
          meals: null,
          section: section.section,
          uid: this.uid,
          timestamp: new Date(section.day).getTime()
        }

        const payload = {
          ...(id ? section.data : defaults),
          ...items
        }
        if (id){
          return this.updateSection(id, payload)
        }else{
          return this.createSection(payload);
        }

      })
    )
  selected$ = this.section$.asObservable().pipe(
    tap(next => this.store.set('selected',next))
  )

  list$ = this.section$.asObservable().pipe(
    map((value: any) => this.store.value[value.type]),
    tap(next => this.store.set('list',next))
  )

  schedule$: Observable<ScheduleItem[]> = this.date$.asObservable().pipe(    
    tap(next => this.store.set('date',next)),
    map((day: any) => {
      const startAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ).getTime();

      const endAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
      ).getTime() -1;

      return { startAt, endAt };  
    }),
    switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt)),    
    map((data: any) => {      
      const mapped: ScheduleList = {};      
      for (const prop of data) { 
        if (prop !== undefined){
          if (!mapped[prop.section]) {
            mapped[prop.section] = prop;
          }
        }
      }
      return mapped;
    }),
    tap((next: any) => this.store.set('schedule', next))
  )  

  constructor(
    private store: Store,
    private db: AngularFirestore,
    private authService: AuthService
  ) { }

  updateDate(date: Date){
    this.date$.next(date);
  }

  selectSection(event: any){
    this.section$.next(event);
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  private updateSection(id: string, payload: ScheduleItem){    
    return this.scheduleCollection.doc(id).update(payload);
  }

  private createSection(payload: ScheduleItem){
    return this.scheduleCollection.add(payload); 
  }

  private getSchedule(startAt: number, endAt: number) {
    this.scheduleCollection = this.db.collection<ScheduleItem>('schedule',
      ref => ref.where('uid','==',this.uid));
    return this.scheduleCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ScheduleItem;
        const id = a.payload.doc.id; 
        const startAtDate = new Date(startAt);
        const endAtDate = new Date(endAt);
        const firebaseDate = new Date(data.timestamp);
        if (firebaseDate >= startAtDate && firebaseDate <= endAtDate){
          return { id, ...data };
        }        
      })
    ))          
  }

  get uid(){
    return this.authService.user.uid;
  }
}
