import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnergyMeterService {
  private apiUrl = 'http://localhost:5000/api/energy-meters'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  getEnergyMeters(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
