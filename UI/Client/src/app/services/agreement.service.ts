import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Agreement } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {
  baseUrl2 = "http://localhost:5000/agreement/";

  constructor(private http: HttpClient, private router: Router) {
  }

  getById(id: number): Observable<Agreement> {
    console.log("Inside agreement service getbyid");
    const res = this.http.get<Agreement>(this.baseUrl2 + 'GetById/' + id);
    console.log(res);
    return res;
  }

  edit(updatedAgreement: Agreement): Observable<any> {
    console.log("Inside edit agreement service", updatedAgreement);
    const res = this.http.put<any>(this.baseUrl2, updatedAgreement);
    console.log(res);
    return res;
  }

  removeItem(userMail: string, agreementId: number) {
    console.log("inside delete service");
    return this.http.delete<any>(this.baseUrl2 + `${userMail}/${agreementId}`);
  }

  getAgreements(userMail: string): Observable<any> {
    console.log("inside get agreements service", userMail);
    return this.http.get<any>(this.baseUrl2 + `${userMail}`);
  }

  Add(agreement: Agreement): Observable<any> {
    const res = this.http.post<any>(this.baseUrl2, agreement);
    console.log(res);
    return res;
  }
}
