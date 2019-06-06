import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from 'src/app/store';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<any[] | Date> = this.date$.asObservable().pipe(
    tap(next => this.store.set('date',next))
  )  

  constructor(
    private store: Store
  ) { }

  updateDate(date: Date){
    this.date$.next(date);
  }
}
