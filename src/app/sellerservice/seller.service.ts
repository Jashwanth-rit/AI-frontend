import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { login, Product, SignUp } from '../datatype';
import { Router } from '@angular/router';
import { environment } from '../../../environment.prod';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';  // Add this import statement


console.log(`${environment.backendUrl}`)

@Injectable({
  providedIn: 'root',
})
export class SellerService {
 
  
}
