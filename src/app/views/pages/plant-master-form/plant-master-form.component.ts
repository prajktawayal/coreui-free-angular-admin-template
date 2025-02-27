import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective
} from '@coreui/angular';

// Define the interface outside the component
interface PlantMasterRecord {
  plantId: string;
  plantName: string;
  factoryId: string;
  plantnumber: string;
  isEditing?: boolean;
}

@Component({
  selector: 'app-plant-master-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonCloseDirective,
    ButtonDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective],
  templateUrl: './plant-master-form.component.html',
  styleUrls: ['./plant-master-form.component.css']
})
export class PlantMasterFormComponent implements OnInit {

  
  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  isFormVisible: boolean = false;
    displayedMsg: string = '';
    isAlready: boolean = false;
    plantForm!: FormGroup;
  
    isModalOpen: boolean = false;
    plantMasterList: PlantMasterRecord[] = [];
  
    constructor(private fb: FormBuilder, private authService: AuthService) {}
  
    ngOnInit(): void {
      this.plantForm = this.fb.group({
        plantid: ['', Validators.required],
        plantname: ['', Validators.required],
        factoryid: ['', Validators.required],
        plantnumber: ['', Validators.required]
      });
      this.getData() ;
    }

  // Toggle the form's visibility
  toggleForm(): void {
    // Optional: if you want to toggle an inline form.
    this.isFormVisible = !this.isFormVisible;

  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    console.log('Modal open:', this.isModalOpen);
    
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
        if (res.message === 'Plant Data added successfully!') {
          this.displayedMsg = "Data inserted successfully";
          alert("Data Inserted Successfully");
          this.plantForm.reset();
          this.getData();
          // Hide the form after submission
          this.isModalOpen = false;
          setTimeout(() => {
            this.displayedMsg = '';
          }, 3000);
        } else if (res.message === 'isalready') {
          this.displayedMsg = "Already Data Exist";
        } else {
          this.displayedMsg = "Something went wrong";
        }
      },
      error: (err) => {
        console.error("API Error:", err);
        this.displayedMsg = "Error occurred while saving data";
      }
    });
  }
  
  getData() {
    console.log("Fetching data...");
    this.authService.getPlantMaster().subscribe({
      next: (res: { success: boolean; message: string; data: PlantMasterRecord[] }) => {
        console.log('API Response:', JSON.stringify(res, null, 2));
        if (res && res.success && Array.isArray(res.data)) {
          this.plantMasterList = res.data.map(record => ({
            ...record,
            isEditing: false
          }));
          this.displayedMsg = this.plantMasterList.length > 0 ? "" : "No data available";
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
  
  editRow(index: number) {
    this.plantMasterList[index].isEditing = true;
  }
  
  saveRow(index: number) {
    const updatedRecord = this.plantMasterList[index];
    const payload = {
      PlantId: updatedRecord.plantId,
      plantName: updatedRecord.plantName,
      FactoryId: updatedRecord.factoryId,
      Plantnumber: updatedRecord.plantnumber
    };
  
    console.log('Calling updatePlantMaster with payload:', payload);
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
      next: (response) => {
        console.log('Record updated successfully:', response);
        updatedRecord.isEditing = false;
      },
      error: (error) => {
        console.error('Error updating record:', error);
      }
    });
  }
  
  DeleteRow(index: number) {
    const deleteRecord = this.plantMasterList[index];
    if (!deleteRecord || !deleteRecord.plantId) {
      console.warn('Invalid record:', deleteRecord);
      return;
    }
  
    console.log('Calling deletePlantMaster with:', deleteRecord.plantId);
    const confirmDelete = window.confirm("Do you really want to delete this data?");
    if (!confirmDelete) {
      return; // Exit if the user cancels
}
    this.authService.deletePlantMaster(deleteRecord.plantId).subscribe({
      next: (response) => {
        console.log('Record deleted successfully:', response);
        this.plantMasterList.splice(index, 1);
      },
      error: (error) => {
        alert('Error while deleting record:');
        console.error('Error deleting record:', error);
      }
    });
  }
  
  get PlantId() { return this.plantForm.get('plantid'); }
  get PlantName() { return this.plantForm.get('plantname'); }
  get FactoryId() { return this.plantForm.get('factoryid'); }
  get PlantNumber() { return this.plantForm.get('plantnumber'); }
}
