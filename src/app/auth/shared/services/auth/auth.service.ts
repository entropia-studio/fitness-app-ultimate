import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from 'src/app/store';
import { Observable } from 'rxjs';



export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth$ = this.af.authState.subscribe(firebaseUser => {
    if (!firebaseUser){
      this.store.set('user',null);
      return;
    }
    const user: User = {
      email: firebaseUser.email,
      uid: firebaseUser.uid,
      authenticated: true
    }
    this.store.set('user',user);
  })    

  get user(){
    return this.af.auth.currentUser;
  }

  get authState(): Observable<firebase.User>{
    return this.af.authState;
  }

  constructor(
    private af: AngularFireAuth,
    private store: Store
  ) { }

  createUser(email: string, password: string){
    return this.af.auth
      .createUserWithEmailAndPassword(email,password);
  }

  loginUser(email: string, password: string){
    return this.af.auth
      .signInWithEmailAndPassword(email,password);
  }

  logoutUser(){
    return this.af.auth
      .signOut();
  }

}
