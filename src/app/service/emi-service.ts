import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmiService {

  private readonly API_URL = 'http://localhost:8080/api/loan/emi';

  constructor(private http: HttpClient) {}

  calculateEmi(payload: any): Observable<any> {
    return this.http.post(this.API_URL, payload);
  }
}
