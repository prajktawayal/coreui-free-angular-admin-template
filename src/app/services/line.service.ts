import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'  
})

export class LineService {
  //private baseserverurl = 'http://192.168.2.172:8001/api/'; // ✅ Adjust base URL as needed
  private baseserverurl = 'http://192.168.2.172:8001/api/';
 //private baseserverurl = 'https://localhost:44303/api/';
  constructor(private http: HttpClient) {}  


  
  SaveLineMaster(master: { LineId: string; NoOfLines: string; PlantId: string; Factory: string; LineName: string }) {
    return this.http.post<{ message: string }>(`${this.baseserverurl}LineMaster/LineMaster`, master);
  }


  getLineMaster(): Observable<any> {
    return this.http.get<any>(`${this.baseserverurl}LineMaster/GetAllLineMaster`);
  }


  updateLineMaster(payload: { LineId: string; NoOfLines: string; PlantId: string; Factory: string; LineName: string }) {
    return this.http.post<{ message: string }>(`${this.baseserverurl}LineMaster/UpdateLineMaster`, payload);
  }



  deleteLineMaster(LineId: string) {
    return this.http.delete<{ message: string }>(`${this.baseserverurl}LineMaster/${LineId}`);
  }

}
