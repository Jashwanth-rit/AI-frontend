import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { login, Product, SignUp } from '../datatype';
import { Router } from '@angular/router';
import { environment } from '../../../environment.prod';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';  // Add this import statement




@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private apiUrl = 'https://your-backend-server-url/api';

  constructor(private http: HttpClient) {}

  sendData(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit-query`, data);
  }
 
  
}
