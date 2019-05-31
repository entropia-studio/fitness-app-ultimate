import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/auth/shared/services/auth/auth.service';


@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  @Output()
  logout = new EventEmitter<any>();

  @Input()
  user: User;

  logoutUser(){
    this.logout.emit();
  }

}
