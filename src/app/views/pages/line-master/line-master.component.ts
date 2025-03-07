import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LineService } from '../../../services/line.service';
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


interface LineMasterRecord {
  LineId: string;
  NoOfLines: string;
  PlantId: string;
  Factory: string;
  LineName: string;
  isEditing?: boolean;
}

@Component({
  selector: 'app-line-master',
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
  templateUrl: './line-master.component.html',
  styleUrls: ['./line-master.component.css']
})
export class LineMasterComponent implements OnInit {
  public visible = false;


  toggleLineMaster() {
    this.visible = !this.visible;
  }

  handleLivePlantChange(event: any) {
    this.visible = event;
  }


  isFormVisible: boolean = false;
      displayedMsg: string = '';
      isAlready: boolean = false;
      lineForm!: FormGroup;
    
      isModalOpen: boolean = false;
      lineMasterList: LineMasterRecord[] = [];
    
      constructor(private fb: FormBuilder, private lineService:LineService) {}

      ngOnInit(): void {
        console.log("Initializing component..."); // Debugging log
        this.lineForm = this.fb.group({
          LineId: ['', Validators.required],
          NoOfLines: ['', Validators.required],
          PlantId: ['', Validators.required],
          Factory: ['', Validators.required],
          LineName: ['', Validators.required]
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
  lineFormSubmit() {
    if (this.lineForm.invalid) {
      console.warn("Form is invalid", this.lineForm.value);
      return;
    }

    const LineMasterData = {
      LineId: this.lineForm.value.LineId?.trim() ? String(this.lineForm.value.LineId) : '',
      NoOfLines: this.lineForm.value.NoOfLines?.trim() ? String(this.lineForm.value.NoOfLines) : '',
      PlantId: this.lineForm.value.PlantId?.trim() ? String(this.lineForm.value.PlantId) : '',
      FactoryId: this.lineForm.value.Factory?.trim() ? String(this.lineForm.value.Factory) : '',
      LineName: this.lineForm.value.LineName?.trim() ? String(this.lineForm.value.LineName) : ''
    };


    console.log("Submitting data:", LineMasterData);
    const confirmSave = window.confirm("Do you really want to Save this data?");
    if (!confirmSave) {
    return; // Exit if the user cancels
  }

  this.lineService.SaveLineMaster(LineMasterData).subscribe({
    next: (res: any) => {
      console.log('API Response:', res);
      if (res.message === 'Line Data added successfully!') {
        this.displayedMsg = "Data inserted successfully";
        alert("Data Inserted Successfully");
        this.lineForm.reset();
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


  // Fetch all data from API
  getData() {
    console.log("Fetching data...");
    this.lineService.getLineMaster().subscribe({
      next: (res: { success: boolean; message: string; data: any[] }) => {
        console.log('API Response:', JSON.stringify(res, null, 2));
  
        if (res && res.success && Array.isArray(res.data)) {
          // Map the API response to match the expected structure
          this.lineMasterList = res.data.map(record => ({
            LineId: record.lineId,        // Fix camelCase to PascalCase
            NoOfLines: record.noOfLines,
            PlantId: record.plantId,
            Factory: record.factoryId,
            LineName: record.lineName,
            isEditing: false
          }));
  
          console.log("Processed Data:", this.lineMasterList); // Log mapped data
          this.displayedMsg = this.lineMasterList.length > 0 ? "" : "No data available";
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
    this.lineMasterList[index].isEditing = true;
  }

  saveRow(index: number) {
    const updatedRecord = this.lineMasterList[index];
    const payload = {
      LineId: updatedRecord.LineId,
      NoOfLines: updatedRecord.NoOfLines,
      PlantId: updatedRecord.PlantId,
      FactoryId: updatedRecord.Factory,
      LineName: updatedRecord.LineName
    };
  

 console.log('Calling updateLineMaster with payload:', payload);
    const isValid = Object.values(payload).every(value => value !== null && value !== '' && value !== undefined);

    if (!isValid) {
      alert("Please fill data properly");
      return; // Exit the function if data is invalid
    }
    const confirmUpdate = window.confirm("Do you really want to Update this data?");
    if (!confirmUpdate) {
      return; // Exit if the user cancels
    }
    this.lineService.updateLineMaster(payload).subscribe({
      next: (response) => {
        console.log('Record updated successfully:', response);
        updatedRecord.isEditing = false;
      },
      error: (error) => {
        console.error('Error updating record:', error);
      }
    });
  }
 
  // Delete a row
  DeleteRow(index: number) {
    const deleteRecord = this.lineMasterList[index];
    if (!deleteRecord || !deleteRecord.LineId) {
      console.warn('Invalid record:', deleteRecord);
      return;
    }
    console.log('Calling deleteLineMaster with:', deleteRecord.LineId);
    const confirmDelete = window.confirm("Do you really want to delete this data?");
    if (!confirmDelete) {
      return; // Exit if the user cancels
}
    this.lineService.deleteLineMaster(deleteRecord.LineId).subscribe({
      next: (response) => {
        console.log('Record deleted successfully:', response);
        this.lineMasterList.splice(index, 1);
      },
      error: (error) => {
        alert('Error while deleting record:');
        console.error('Error deleting record:', error);
      }
    });
  }
  
  get LineId() { return this.lineForm.get('LineId'); }
  get NoOfLines() { return this.lineForm.get('NoOfLines'); }
  get PlantId() { return this.lineForm.get('PlantId'); }
  get Factory() { return this.lineForm.get('Factory'); }
  get LineName() { return this.lineForm.get('LineName'); }
}
