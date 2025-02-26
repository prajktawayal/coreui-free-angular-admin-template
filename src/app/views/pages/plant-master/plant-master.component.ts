import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

export interface PlantMasterRecord {
  plantId: string;
  plantName: string;
  factoryId: string;
  plantnumber: string;
  // add other properties if needed
  isEditing?: boolean;
}
@Component({
  selector: 'app-plant-master',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule], 
  templateUrl: './plant-master.component.html',
  styleUrls: ['./plant-master.component.css']
})

export class PlantMasterComponent implements OnInit {
  displayedMsg: string = '';
  isAlready: boolean = false;
  plantForm!: FormGroup;

  showTable: boolean = false;
  plantMasterList: { [key: string]: PlantMasterRecord } = {};


  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.plantForm = this.fb.group({
      plantid: ['', Validators.required],
      plantname: ['',Validators.required],
      factoryid: ['',Validators.required],
      plantnumber: ['',Validators.required]
    });

   this.getData();
  }
  plantFormSubmit() {
    if (this.plantForm.invalid) {
      console.warn("Form is invalid", this.plantForm.value);
      return;
    }
  
    const plantMasterData = {
      PlantId: this.plantForm.value.plantid?.trim() ? String(this.plantForm.value.plantid) : '',
      plantName: this.plantForm.value.plantname?.trim() ? String(this.plantForm.value.plantname) : '',
      FactoryId: this.plantForm.value.factoryid?.trim() ? String(this.plantForm.value.factoryid) : '',
      Plantnumber: this.plantForm.value.plantnumber?.trim() ? String(this.plantForm.value.plantnumber) : ''
    };
  
    console.log("Submitting data:", plantMasterData);
  
    this.authService.SavePlantMaster(plantMasterData).subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        
        if (res.message === 'Plant Data added successfully!') {
          this.displayedMsg = "Data inserted successfully";
          alert("Data Inserted Sucessfully");
          this.isAlready = true;
          this.plantForm.reset();
          this.getData();
          this.showTable = true;
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
  
  getData() {
    console.log("Fetching data...");
  
    this.authService.getPlantMaster().subscribe({
      next: (res: any) => {
        console.log('API Response:', JSON.stringify(res, null, 2));
        
        // If res is an array, convert it to an object.
        // Here we're using the index as the key (you can choose a different key if available)
        this.plantMasterList = {};
        (res as PlantMasterRecord[]).forEach((record, index) => {
          this.plantMasterList['' + (index+1)] = record;
        
        });
        
        if (Object.keys(this.plantMasterList).length > 0) {
          this.displayedMsg = "";
        } else {
          this.displayedMsg = "No data available";
        }
      },
      error: (err) => {
        console.error("API Error:", JSON.stringify(err, null, 2));
        this.displayedMsg = "";
      }
    });
  
    // this.authService.getPlantMaster().subscribe({
    //   next: (res: any) => {
    //     this.plantMasterList = {};
    //     (res as PlantMasterRecord[]).forEach((record, index) => {
    //       // Initialize the edit mode flag
    //       record.isEditing = false;
    //       this.plantMasterList['' + (index + 1)] = record;
    //     });
    //     this.displayedMsg = Object.keys(this.plantMasterList).length > 0
    //       ? ""
    //       : "No data available";
    //   },
    //   error: (err) => {
    //     console.error("API Error:", JSON.stringify(err, null, 2));
    //     this.displayedMsg = "Error occurred while fetching data";
    //   }
    // });
  }
  editRow(key: string) {
    this.plantMasterList[key].isEditing = true;
  }

  // Save the row changes and exit edit mode
  saveRow(key: string) {
    const updatedRecord = this.plantMasterList[key];
    const payload = {
      PlantId: updatedRecord.plantId,
      plantName: updatedRecord.plantName,
      FactoryId: updatedRecord.factoryId,
      Plantnumber: updatedRecord.plantnumber
    };
  
    console.log('Calling updatePlantMaster with payload:', payload);
  
    this.authService.updatePlantMaster(payload).subscribe({
      next: (response) => {
        console.log('Record updated successfully:', response);
        updatedRecord.isEditing = false;
      },
      error: (error) => {
        console.error('Error updating record:', error);
      }
    });
  }
  DeleteRow(key: string) {
    if (!this.plantMasterList || typeof this.plantMasterList !== 'object') {
      console.error('plantMasterList is not a valid object:', this.plantMasterList);
      return;
    }
  
    const DeleteRecord = this.plantMasterList[key];
    if (!DeleteRecord || !DeleteRecord.plantId) {
      console.warn('Invalid key or missing plantId:', key, DeleteRecord);
      return;
    }
  
    const Deleteitem = { PlantId: DeleteRecord.plantId };
  
    console.log('Calling DeletePlantMaster with:', Deleteitem);
    this.authService.deletePlantMaster(DeleteRecord.plantId).subscribe({
      next: (response) => {
        console.log('Record deleted successfully:', response);
        this.getData();
      },
      error: (error) => {
        console.error('Error deleting record:', error);
      }
    });
    
  }
  
  

 
  
  get PlantId() { return this.plantForm.get('plantid'); }
  get PlantName() { return this.plantForm.get('plantname'); }
  get FactoryId() { return this.plantForm.get('factoryid'); }
  get PlantNumber() { return this.plantForm.get('plantnumber'); }
}

