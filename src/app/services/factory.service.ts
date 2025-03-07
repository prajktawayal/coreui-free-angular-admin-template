import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'  
})
export class FactoryService {
  private baseserverurl = 'http://192.168.2.172:8001/api/';  // ✅ Adjust as needed

  constructor(private http: HttpClient) {}  

  // Save a new Factory Master record
  SaveFactoryMaster(master: { FactoryId: string; FactoryName: string; Address: string; Contact: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseserverurl}FactoryMaster/FactoryMaster`, master);
  }

  // Get all Factory Master records
  getFactoryMaster(): Observable<any> {
    return this.http.get<any>(`${this.baseserverurl}FactoryMaster/AllFactoryMaster`);
  }

  // Update an existing Factory Master record
  updateFactoryMaster(payload: { FactoryId: string; FactoryName: string; Address: string; Contact: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseserverurl}FactoryMaster/UpdateFactoryMaster`, payload);
  }

  // Delete a Factory Master record
  deleteFactoryMaster(FactoryId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseserverurl}FactoryMaster/${FactoryId}`);
  }
}
