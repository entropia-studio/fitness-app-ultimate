import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from './store';
import { AuthService } from './auth/shared/services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{  

  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ){}

  ngOnInit(){
    this.subscription = this.authService.auth$;
    this.user$ = this.store.select<User>('user');
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async onLogout(){   
    await this.authService.logoutUser();    
    this.router.navigate(['/auth/login']);   
  }

}
