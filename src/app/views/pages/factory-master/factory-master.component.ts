import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FactoryService}from '../../../services/factory.service';
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

interface FactoryMasterRecord {
  FactoryId: string;
  FactoryName: string;
  Address: string;
  Contact: string;
  isEditing?: boolean;

}


@Component({
  selector: 'app-factory-master',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonCloseDirective,
    ButtonDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective
  ],
  templateUrl: './factory-master.component.html',
  styleUrls: ['./factory-master.component.css']
})

export class factoryMasterComponent implements OnInit {
  public visible = false;


  toggleFactoryMaster() {
    this.visible = !this.visible;
  }

  handleLivePlantChange(event: any) {
    this.visible = event;
  }


  isFormVisible: boolean = false;
      displayedMsg: string = '';
      isAlready: boolean = false;
      factoryForm!: FormGroup;
    
      isModalOpen: boolean = false;
      FactoryMasterList: FactoryMasterRecord[] = [];
    
      constructor(private fb: FormBuilder, private FactoryService:FactoryService) {}

      ngOnInit(): void {
        console.log("Initializing component..."); // Debugging log
        this.factoryForm = this.fb.group({
          FactoryId: ['', Validators.required],
          FactoryName: ['', Validators.required],
          Address: ['', Validators.required],
          Contact: ['', Validators.required],
        });
      
        this.getData(); // Ensure this is being called
      }
      
  toggleForm(): void {
    // Optional: if you want to toggle an inline form.
    this.isFormVisible = !this.isFormVisible;

  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    console.log('Modal open:', this.isModalOpen);
    
  }
  FactoryFormSubmit() {
    if (this.factoryForm.invalid) {
      console.warn("Form is invalid", this.factoryForm.value);
      return;
    }

    const FactoryMasterData = {
      FactoryId: this.factoryForm.value.FactoryId?.trim() ? String(this.factoryForm.value.FactoryId) : '',
      FactoryName: this.factoryForm.value.FactoryName?.trim() ? String(this.factoryForm.value.FactoryName) : '',
      Address: this.factoryForm.value.Address?.trim() ? String(this.factoryForm.value.Address) : '',
      Contact: this.factoryForm.value.Contact?.trim() ? String(this.factoryForm.value.Contact) : '',
       };


    console.log("Submitting data:", FactoryMasterData);
    const confirmSave = window.confirm("Do you really want to Save this data?");
    if (!confirmSave) {
    return; // Exit if the user cancels
  }


  this.FactoryService.SaveFactoryMaster(FactoryMasterData).subscribe({
    next: (res: any) => {
      console.log('API Response:', res);
      if (res.message === 'Factory Data added successfully!') {
        this.displayedMsg = "Data inserted successfully";
        alert("Data Inserted Successfully");
        this.factoryForm.reset();
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
  this.FactoryService.getFactoryMaster().subscribe({
    next: (res: { success: boolean; message: string; data: any[] }) => {
      console.log('API Response:', JSON.stringify(res, null, 2));

      if (res && res.success && Array.isArray(res.data)) {
        // Map the API response to match the expected structure
        this.FactoryMasterList = res.data.map(record => ({
          FactoryId: record.factoryId,        // Fix camelCase to PascalCase
          FactoryName: record.factoryName,
          Address: record.address,
          Contact: record.contact,
        
          isEditing: false
        }));

        console.log("Processed Data:", this.FactoryMasterList); // Log mapped data
        this.displayedMsg = this.FactoryMasterList.length > 0 ? "" : "No data available";
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
  this.FactoryMasterList[index].isEditing = true;
}

saveRow(index: number) {
  const updatedRecord = this.FactoryMasterList[index];
  const payload = {
    FactoryId: updatedRecord.FactoryId,
    FactoryName: updatedRecord.FactoryName,
    Address: updatedRecord.Address,
    Contact: updatedRecord.Contact,
   
  };



  console.log('Calling updateFactoryMaster with payload:', payload);
    const isValid = Object.values(payload).every(value => value !== null && value !== '' && value !== undefined);

    if (!isValid) {
      alert("Please fill data properly");
      return; // Exit the function if data is invalid
    }
    const confirmUpdate = window.confirm("Do you really want to Update this data?");
    if (!confirmUpdate) {
      return; // Exit if the user cancels
    }
    this.FactoryService.updateFactoryMaster(payload).subscribe({
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
  const deleteRecord = this.FactoryMasterList[index];
  if (!deleteRecord || !deleteRecord.FactoryId) {
    console.warn('Invalid record:', deleteRecord);
    return;
  }
  console.log('Calling deleteLineMaster with:', deleteRecord.FactoryId);
  const confirmDelete = window.confirm("Do you really want to delete this data?");
  if (!confirmDelete) {
    return; // Exit if the user cancels
}
  this.FactoryService.deleteFactoryMaster(deleteRecord.FactoryId).subscribe({
    next: (response) => {
      console.log('Record deleted successfully:', response);
      this.FactoryMasterList.splice(index, 1);
    },
    error: (error) => {
      alert('Error while deleting record:');
      console.error('Error deleting record:', error);
    }
  });
}

get FactoryId() { return this.factoryForm.get('FactoryId'); }
  get FactoryName() { return this.factoryForm.get('FactoryName'); }
  get Address() { return this.factoryForm.get('Address'); }
  get Contact() { return this.factoryForm.get('Contact'); }
}
  
