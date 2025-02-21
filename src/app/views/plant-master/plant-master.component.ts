import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-plant-master',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './plant-master.component.html',
  styleUrls: ['./plant-master.component.css']
})
export class PlantMasterComponent implements OnInit {
  displayedMsg: string = '';
  isAlready: boolean = false;
  plantForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.plantForm = this.fb.group({
      plantid: ['', Validators.required],
      plantname: [''],
      factoryid: [''],
      plantnumber: ['']
    });
  }
  plantFormSubmit() {
    if (this.plantForm.invalid) {
      console.warn("Form is invalid", this.plantForm.value);
      return;
    }
  
    const plantMasterData = {
      PlantId: String(this.plantForm.value.plantid ?? ''),
      plantName: String(this.plantForm.value.plantname ?? ''),
      FactoryId: String(this.plantForm.value.factoryid ?? ''),
      Plantnumber: String(this.plantForm.value.plantnumber ?? '')
    };
  
    console.log("Submitting data:", plantMasterData);
  
    this.authService.SavePlantMaster(plantMasterData).subscribe({
      next: (res: any) => {  // ✅ Ensure correct type
        console.log('API Response:', res);
        
        if (res.message === 'success') {
          this.displayedMsg = "Data inserted successfully";
          alert("Data Inserted Sucessfully");
          this.isAlready = true;
          this.plantForm.reset();

          setTimeout(() => {
            this.displayedMsg = '';
          }, 3000);
          
        } else if (res.message === 'isalready') {
          this.displayedMsg = "Already Data Exist";
          this.isAlready = false;
        } else {
          this.displayedMsg = "Something went wrong";
          this.isAlready = false;
        }
      },
      error: (err) => {
        console.error("API Error:", err);
        this.displayedMsg = "Error occurred while saving data";
        this.isAlready = false;
      }
    });
    
    
  }
  get PlantId() { return this.plantForm.get('plantid'); }
  get PlantName() { return this.plantForm.get('plantname'); }
  get FactoryId() { return this.plantForm.get('factoryid'); }
  get PlantNumber() { return this.plantForm.get('plantnumber'); }
}
