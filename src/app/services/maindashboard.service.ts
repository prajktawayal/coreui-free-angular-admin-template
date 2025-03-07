import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainDashboardService {
  private baseserverurl = 'http://192.168.2.172:8001/api/';

  constructor(private http: HttpClient) {}

  fetchPlantNames(): Observable<string[]> {
    return this.http.get<{ success: boolean; message: string; data: any[] }>(
      `${this.baseserverurl}PlantMaster/AllPlantMaster`
    ).pipe(
      map((response) => {
        if (response.success && Array.isArray(response.data)) {
          return response.data
            .filter(plant => plant.plantName) // ✅ Filter out only valid plant names
            .map(plant => plant.plantName); // ✅ Extract only `plant_name`
        } else {
          throw new Error('Invalid API response structure');
        }
      })
    );
  }
}
