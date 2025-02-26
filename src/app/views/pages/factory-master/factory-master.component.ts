import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-factory-master',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './factory-master.component.html',
  styleUrls: ['./factory-master.component.css']
})
export class factoryMasterComponent implements OnInit {
  displayedMsg: string = '';
  isAlready: boolean = false;
  factoryForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.factoryForm = this.fb.group({
      factoryid: ['', Validators.required],
      factoryname: [''],
      address: [''],
      contact: ['']
    });
  }
  
  factoryFormSubmit() {
    if (this.factoryForm.invalid) {
      console.warn("Form is invalid", this.factoryForm.value);
      return;
    }
  
    const factoryMasterData = {
      factoryId: String(this.factoryForm.value.factoryid ?? ''),
      factoryName: String(this.factoryForm.value.factoryname ?? ''),
      address: String(this.factoryForm.value.factoryid ?? ''),
      contact: String(this.factoryForm.value.factorynumber ?? '')
    };
  
    console.log("Submitting data:", factoryMasterData);

  }
  get factoryId() { return this.factoryForm.get('factoryid'); }
  get factoryName() { return this.factoryForm.get('factoryname'); }
  get FactoryId() { return this.factoryForm.get('address'); }
  get factoryNumber() { return this.factoryForm.get('contact'); }
}
