import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private jwt: JwtHelperService) { }

  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('token');
  }
}
