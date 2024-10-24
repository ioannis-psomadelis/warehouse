import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserLogin, UserRole } from '@models/user.model';
import { Observable, of } from 'rxjs';
import { SessionStorageService } from '@services/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<User | null>(null);

  sessionStorageService = inject(SessionStorageService);
  router = inject(Router);

  constructor() {
    this.checkStoredUser();
  }

  private checkStoredUser() {
    const storedUser = this.sessionStorageService.getItem('currentUser');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  getCurrentUser() {
    return this.currentUser();
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === UserRole.admin;
  }

  login(userLogin: UserLogin): Observable<UserRole | null> {
    const role = this.validLogin(userLogin.username, userLogin.password);

    if (role === UserRole.admin) {
      this.currentUser.set({
        username: userLogin.username,
        role: UserRole.admin,
      });
      this.sessionStorageService.setItem(
        'currentUser',
        JSON.stringify(this.currentUser()),
      );
    } else if (role === UserRole.user) {
      this.currentUser.set({
        username: userLogin.username,
        role: UserRole.user,
      });
      this.sessionStorageService.setItem(
        'currentUser',
        JSON.stringify(this.currentUser()),
      );
    } else {
      return of(null);
    }

    return of(this.currentUser()!.role);
  }

  private validLogin(username: string, password: string): UserRole | null {
    const user = username === 'user' && password === 'user';
    const admin = username === 'admin' && password === 'admin';
    if (user || admin) {
      return user ? UserRole.user : UserRole.admin;
    }
    return null;
  }

  logout() {
    this.currentUser.set(null);
    this.sessionStorageService.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
