import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginUser } from '../models/models';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenChange = new BehaviorSubject<string | null>(this.getToken());
  baseUrl2 = "http://localhost:5000/api/Users/";

  constructor(private http: HttpClient, private router: Router) {
  }

  login(loginUser: LoginUser): Observable<any> {
    console.log(loginUser);
    return this.http.post<any>(`${this.baseUrl2}login/`, loginUser);
  }

  logout() {
    this.removeToken();
    this.router.navigate([''])
  }
  removeToken() {
    localStorage.clear();
    this.tokenChange.next(null);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenChange.next(token);
  }

  getToken(): string {
    return localStorage.getItem('token')!;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const jwtHelper = new JwtHelperService();
    return !!token && !jwtHelper.isTokenExpired(token);
  }

  public decodedToken(token: string | null) {
    if (!token) {
      return '';
    }
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

  getTokenChange(): BehaviorSubject<string | null> {
    return this.tokenChange;
  }
}
