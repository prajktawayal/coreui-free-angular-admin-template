import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // ✅ Import Observable

@Injectable({
  providedIn: 'root'  // ✅ Ensure it's provided in root
})
export class AuthService {
  //private baseserverurl = 'http://192.168.2.172:8001/api/';
  private baseserverurl = 'http://localhost:2030/api/';

  constructor(private http: HttpClient) {} 

  SavePlantMaster(master: { PlantId: string; plantName: string; FactoryId: string; Plantnumber: string }) {
    return this.http.post<{ message: string }>(`${this.baseserverurl}PlantMaster/PlantMaster`, master);
  }

  getPlantMaster(): Observable<any> {
    return this.http.get<any>(`${this.baseserverurl}PlantMaster/AllPlantMaster`);
  }
  
  updatePlantMaster(payload: { PlantId: string; plantName: string; FactoryId: string; Plantnumber: string }) {
    return this.http.post<{ message: string }>(`${this.baseserverurl}PlantMaster/UpdatePlantMaster`, payload);    
}

  deletePlantMaster(plantId:string) {
    return this.http.delete<{ message: string }>(`${this.baseserverurl}PlantMaster/${plantId}`);
  }
   
}
