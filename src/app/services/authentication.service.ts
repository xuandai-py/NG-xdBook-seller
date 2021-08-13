import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.models';
import {map} from 'rxjs/operators';

const API_URL = `${environment.BASE_URL}/api/authentication/`

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // login > store user credentials > notify > Observers > Observable > RXJS
  public currentUser: Observable<User>; // get credential

  // behaviorSubject(host the value to share) > notify > Observers > Subcribe
  private currentUserSubjet: BehaviorSubject<User>;

  constructor(private http: HttpClient) { 
     let storageUser;
     const storageUserAsStr = localStorage.getItem('currentUser');
     if (storageUserAsStr) {
       storageUser = JSON.parse(storageUserAsStr);
     }

     this.currentUserSubjet = new BehaviorSubject<User>(storageUser);
     this.currentUser = this.currentUserSubjet.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubjet.value;
  }

  login(user: User): Observable<any>{
    return this.http.post<any>(API_URL + 'sign-in', user).pipe( // set current user observable object to intercept
      map(response => {
        if(response){
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubjet.next(response); // next() send manual notification
        }
      })

    );
  }
 
  register(user: User): Observable<any>{
    return this.http.post(API_URL + 'sign-up', user);
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubjet.next(new User);
  }
}
