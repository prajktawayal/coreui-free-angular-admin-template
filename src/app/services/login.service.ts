import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public apiUrl = 'http://192.168.2.172:8001/api/Login/authenticate';

  constructor(private http: HttpClient) {}  // ✅ Inject HttpClient

  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { userName, password });
  }
}
