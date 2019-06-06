import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'schedule-days',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss']
})
export class ScheduleDaysComponent implements OnInit {

  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  @Input()
  selected: number;

  @Output()
  select = new EventEmitter<number>();  

  ngOnInit() {
  }

  selectDay(index: number) {
    this.select.emit(index);
  }

}
