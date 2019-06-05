import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  
  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  toggled: boolean = false;

  constructor() { }

  ngOnInit() {    
  }

  getRoute(item: any){
    return [`../${item.ingredients ? 'meals' : 'workout' }`, item.id];
  }

  removeItem(){
    this.remove.emit(this.item);
  }

  toggle(){
    this.toggled = !this.toggled;
  }

}
