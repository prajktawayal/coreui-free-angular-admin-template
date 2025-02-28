import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // ✅ Import Observable

@Injectable({
  providedIn: 'root'  // ✅ Ensure it's provided in root
})
export class LineService {
  //private baseserverurl = 'http://localhost:8001/api/'; // ✅ Adjust base URL as needed
 private baseserverurl = 'http://192.168.2.172:8001/api/';
  constructor(private http: HttpClient) {}  

  // ✅ Create a new Line Master entry
  SaveLineMaster(linemaster: { LineId: string; NoOfLines: string; PlantId: string; FactoryId: string; LineName: string }) {
    return this.http.post<{ message: string }>(`${this.baseserverurl}LineMaster/LineMaster`, linemaster);
  }

  // ✅ Fetch all Line Master data
  getLineMaster(): Observable<any> {
    return this.http.get<any>(`${this.baseserverurl}LineMaster/LineMaster`);
  }

  // ✅ Update an existing Line Master entry
  updateLineMaster(payload: { LineId: string; NoOfLines: string; PlantId: string; FactoryId: string; LineName: string }) {
    return this.http.post<{ message: string }>(`${this.baseserverurl}LineMaster/UpdateLineMaster`, payload);
  }

  // ✅ Delete a Line Master entry
  deleteLineMaster(LineId: string) {
    return this.http.delete<{ message: string }>(`${this.baseserverurl}LineMaster/${LineId}`);
  }
}
