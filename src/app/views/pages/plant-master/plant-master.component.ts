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
  
    const confirmSave = window.confirm("Do you really want to Save this data?");
    if (!confirmSave) {
    return; // Exit if the user cancels
  }
    this.authService.SavePlantMaster(plantMasterData).subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        
        // if (res.message === 'Plant Data added successfully!')
        if (res && res.success)
        {
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
  
//  getData() {
//   console.log("Fetching data...");

//   this.authService.getPlantMaster().subscribe({
//     next: (res: any) => {
//       console.log('API Response:', JSON.stringify(res, null, 2));

//       // Ensure res is an array before using forEach
//       if (Array.isArray(res)) {
//         this.plantMasterList = {};
//         res.forEach((record, index) => {
//           this.plantMasterList['' + (index + 1)] = record;
//         });

//         this.displayedMsg = Object.keys(this.plantMasterList).length > 0 ? "" : "No data available";
//       } else {
//         console.error("Unexpected API response format:", res);
//         this.displayedMsg = "Invalid response from server";
//       }
//     },
//     error: (err) => {
//       console.error("API Error:", JSON.stringify(err, null, 2));
//       this.displayedMsg = "Failed to fetch data";
//     }
//   });
// }

getData() {
  console.log("Fetching data...");
 
  this.authService.getPlantMaster().subscribe({
    next: (res: { success: boolean; message: string; data: PlantMasterRecord[] }) => {
      console.log('API Response:', JSON.stringify(res, null, 2));

      if (res && res.success && Array.isArray(res.data)) {
        this.plantMasterList = {};
        
        res.data.forEach((record: PlantMasterRecord, index: number) => {
          record.isEditing = false; // Initialize edit mode flag
          this.plantMasterList['' + (index + 1)] = record;
        });

        this.displayedMsg = Object.keys(this.plantMasterList).length > 0
          ? ""
          : "No data available";
      } else {
        console.error("Unexpected API response format:", res);
        this.displayedMsg = "Invalid response from server";
      }
    },
    error: (err) => {
      console.error("API Error:", JSON.stringify(err, null, 2));
      this.displayedMsg = "Error occurred while fetching data";
    }
  });
}


  editRow(key: string) {
    this.plantMasterList[key].isEditing = true;
  }


  // Save the row changes and exit edit mode
  saveRow(key: string) {
    const updatedRecord = this.plantMasterList[key];
  
    if (!updatedRecord || !updatedRecord.plantId) {
      console.error('Invalid record or missing PlantId');
      return;
    }
  
    const payload = {
      PlantId: updatedRecord.plantId,
      plantName: updatedRecord.plantName,
      FactoryId: updatedRecord.factoryId,
      Plantnumber: updatedRecord.plantnumber
    };
  
    console.log('Updating PlantId:', updatedRecord.plantId, 'with payload:', payload);
  


// Before making the update API call, check if any required fields are null or empty
const isValid = Object.values(payload).every(value => value !== null && value !== '' && value !== undefined);

if (!isValid) {
  alert("Please fill data properly");
  return; // Exit the function if data is invalid
}
const confirmUpdate = window.confirm("Do you really want to Update this data?");
if (!confirmUpdate) {
  return; // Exit if the user cancels
}
this.authService.updatePlantMaster(payload).subscribe({
  next: (res: any) => {
    console.log('Record updated successfully:', res);

    if (res && res.success) {
      this.displayedMsg = "Data Updated successfully";
      alert("Data Updated successfully");

      // Exit edit mode
      updatedRecord.isEditing = false;

      // Refresh data after update
      this.getData();

      // Clear message after 3 seconds
      setTimeout(() => {
        this.displayedMsg = '';
      }, 3000);
    } else {
      console.error("API did not return success:", res);
      this.displayedMsg = "Something went wrong";
      updatedRecord.isEditing = false;
    }
  },
  error: (err) => {
    console.error("API Error:", err);
    this.displayedMsg = "Error occurred while saving data";
    updatedRecord.isEditing = false;
  }
});

    
  

  }
  
  
  DeleteRow(key: string) {
    if (!this.plantMasterList || typeof this.plantMasterList !== 'object') {
      console.error('plantMasterList is not a valid object:', this.plantMasterList);
      return;
    }
  
    const deleteRecord = this.plantMasterList[key];

    if (!deleteRecord || !deleteRecord.plantId) {
      console.warn('Invalid key or missing plantId:', key, deleteRecord);
      return;
    }
    
    console.log('Calling deletePlantMaster with PlantId:', deleteRecord.plantId);
    // Show confirmation dialog before deleting
    const confirmDelete = window.confirm("Do you really want to delete this data?");
    if (!confirmDelete) {
      return; // Exit if the user cancels
}
    
    this.authService.deletePlantMaster(deleteRecord.plantId).subscribe({
      next: (res: any) => {
        console.log('Record deleted successfully:', res);
    
        if (res && res.success) {
          this.displayedMsg = "Data Deleted successfully";
          alert("Data Deleted successfully");
    
          // Refresh data after delete
          this.getData();
    
          // Clear message after 3 seconds
          setTimeout(() => {
            this.displayedMsg = '';
          }, 3000);
        } else {
          console.error("API did not return success:", res);
          this.displayedMsg = "Something went wrong";
        }
      },
      error: (err) => {
        console.error("API Error:", err);
        this.displayedMsg = "Error occurred while deleting data";
      }
    });
    
    
  }
<<<<<<< HEAD
=======
 
>>>>>>> dd821388463a8e56513b3c79ed819c77ad0d4073
  get PlantId() { return this.plantForm.get('plantid'); }
  get PlantName() { return this.plantForm.get('plantname'); }
  get FactoryId() { return this.plantForm.get('factoryid'); }
  get PlantNumber() { return this.plantForm.get('plantnumber'); }
}

