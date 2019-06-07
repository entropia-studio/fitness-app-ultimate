import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { Store } from 'src/app/store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp: number,
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

  // schedule$: Observable<any[] | Date> = this.date$.asObservable().pipe(
  //   tap(next => this.store.set('date',next))
  // )  

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
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
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

  private getSchedule(startAt: number, endAt: number) {
    this.scheduleCollection = this.db.collection<ScheduleItem>('schedule',
      ref => ref.where('uid','==',this.uid));
    return this.scheduleCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ScheduleItem;
        const id = a.payload.doc.id;    
        return { id, ...data };
      })
    ))          
  }

  get uid(){
    return this.authService.user.uid;
  }
}
