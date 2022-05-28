import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../broker/src/environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  public currentUser: Observable<User> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('currentUser');

    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, captcha: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/authentication/authenticate`, { username, password, captcha })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    if (this.currentUserValue.success) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(new User());
      this.router.navigate(['./broker/account/login']);
    }
  }
}
