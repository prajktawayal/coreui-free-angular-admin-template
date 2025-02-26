import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LineService } from 'src/app/services/line.service';


@Component({
  selector: 'app-line-master',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './line-master.component.html',
  styleUrls: ['./line-master.component.css']
})

export class lineMasterComponent implements OnInit {
  displayedMsg: string = '';
  isAlready: boolean = false;
  lineForm!: FormGroup;

  constructor(private fb: FormBuilder,private lineService:LineService) {}

  ngOnInit(): void {
    this.lineForm = this.fb.group({
      LineId: ['', Validators.required],
      NoOfLines: ['', Validators.required],
      PlantId: ['', Validators.required],
      Factory: ['', Validators.required],
      LineName: ['', Validators.required]
    });
  }

  lineFormSubmit() {
    if (this.lineForm.invalid) {
      console.warn("Form is invalid", this.lineForm.value);
      return;
    }
  
    const lineMasterData = {

      LineId: String(this.lineForm.value.LineId ?? ''),
      NoOfLines: String(this.lineForm.value.NoOfLines ?? ''),
      PlantId: String(this.lineForm.value.PlantId ?? ''),
      Factory: String(this.lineForm.value.Factory ?? ''),
      LineName: String(this.lineForm.value.LineName ?? '')
      
    };
  
    console.log("Submitting data:", lineMasterData);
  
    this.lineService.SaveLineMaster(lineMasterData).subscribe({
      next: (res:any)=>{console.log('API Response:', res);

        if(res.message==='Line Data added successfully!')
        {  
          this.displayedMsg="Data inserted Sucessfully";
          alert("Data Inserted Sucessfully");
          this.isAlready=true;
          this.lineForm.reset();

          setTimeout(()=>{
          this.displayedMsg='';
       },3000);

      } else if(res.message==='isalready')
      {
        this.displayedMsg="Already Data Exist";
        this.isAlready=false;
      } else{
        this.displayedMsg="Something went wrong";
        this.isAlready=false;
      }
      },
      error:(err) =>
      {
        console.error("API Error:", err);
        this.displayedMsg="Error Occurred while saving data";
        this.isAlready=false;
      }
    });

  }
  get lineId() { return this.lineForm.get('LineId'); }
  get lineName() { return this.lineForm.get('NoOfLines'); }
  get plantId(){return this.lineForm.get('PlantId')}
  get FactoryId() { return this.lineForm.get('Factory'); }
  get lineNumber() { return this.lineForm.get('LineName'); }
}
