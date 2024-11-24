import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PhoneNumber } from '../models/number.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NumberService {
  private apiUrl = environment.apiUrl + environment.fetchNumber; 
  private apiKey = environment.apiKey; 


  constructor(private http: HttpClient) {}

  fetchNumbers(): Observable<PhoneNumber[]> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey, // Use the header name expected by the backend
    });
    return this.http.get<PhoneNumber[]>(this.apiUrl, {headers}).pipe(
      catchError((error) => {
        console.error('Error fetching numbers:', error);
        return throwError(() => new Error('Failed to fetch numbers. Please try again later.'));
      })
    );
  }
}
