import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../../services/register.service';
import { FormsModule } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';


import {
  ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent,
  InputGroupComponent, InputGroupTextDirective, ButtonDirective
} from '@coreui/angular';
import { emailDomainValidator } from '../../../validator/custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[CommonModule,ReactiveFormsModule,FormsModule, 
    ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent,
    InputGroupComponent, InputGroupTextDirective, IconDirective, ButtonDirective,]
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder,private authService: RegisterService,private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(20),Validators.pattern('^[a-zA-Z0-9]+$')]],
      userRole: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, emailDomainValidator(['com', 'org', 'net'])]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('repeatPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  // Convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // Send form data to AuthService
    this.authService.registerUser(this.registerForm.value).subscribe(
      response => {
        alert('Registration successful');
        console.log('Registration successful', response);
        this.registerForm.reset();
        this.submitted = false;
        this.router.navigate(['/login']);
      },
      error => {
        alert('Registration failed!');
        console.error('Registration failed', error);
        this.errorMessage = 'Registration failed. Please try again later.';
      }
     
    );

  }
}  
