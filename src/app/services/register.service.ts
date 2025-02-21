import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'https://your-backend-api-url/api/register'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  registerUser(formData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, JSON.stringify(formData), { headers });
  }

  getUserData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
