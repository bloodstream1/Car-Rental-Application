import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl2 = "http://localhost:5000/";

  constructor(private http: HttpClient, private router: Router) {
  }

  getById(id:number):Observable<Car>{
    console.log("Inside car service getbyid");
    const res = this.http.get<Car>(this.baseUrl2+'car/'+id);
    console.log(res);
    return res;
  }

  getAll(): Observable<any[]> {
    const res = this.http.get<any[]>(this.baseUrl2 + 'car/');
    console.log("Inside getall", res);
    return res;
  }

  Add(car: Car): Observable<any> {
    console.log(car);
    const res = this.http.post<any>(this.baseUrl2 + 'car/', car);
    return res;
  }

  edit(car:Car):Observable<any>{
    console.log("Inside edit car service",car);
    const res = this.http.put<any>(this.baseUrl2+'car/', car);
    return res;
  }

  delete(id:number):Observable<any>{
    console.log("Inside delete car service");
    const res = this.http.delete<any>(this.baseUrl2+'car/'+id);
    console.log(res);
    return res;
  }

}
