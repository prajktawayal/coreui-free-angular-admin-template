import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // ✅ Ensure it's provided in root
})
export class LineService {
  private baseserverurl = 'https://localhost:44303/api/';

  constructor(private http: HttpClient) {}  // ✅ Use @Inject()

    SaveLineMaster(linemaster: { LineId: string; NoOfLines: string; PlantId: string; Factory: string; LineName: string }) {
    return this.http.post<{ message: string }>(`${this.baseserverurl}LineMaster/LineMaster`, linemaster);
    
  }

}
