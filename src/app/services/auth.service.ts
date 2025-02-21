import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // ✅ Ensure it's provided in root
})
export class AuthService {
  private baseserverurl = 'http://localhost:2030/api/';

  constructor(@Inject(HttpClient) private http: HttpClient) {}  // ✅ Use @Inject()

  SavePlantMaster(master: { PlantId: string; plantName: string; FactoryId: string; Plantnumber: string }) {
    return this.http.post<{ message: string }>(`${this.baseserverurl}PlantMaster/PlantMaster`, master);

  }
}
