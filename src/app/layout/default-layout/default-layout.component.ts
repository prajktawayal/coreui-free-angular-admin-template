import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { IconDirective } from '@coreui/icons-angular';
import { RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective } from '@coreui/angular';
import { ImgModule } from '@coreui/angular';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // ✅ Import CommonModule

// import { IconDirective } from '@coreui/icons-angular';
import {
  AvatarModule,
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { LoginService } from '../../services/login.service';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    AvatarModule,
    // IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ImgModule,
    FormsModule,
    ReactiveFormsModule ,
    CommonModule,
    ShadowOnScrollDirective, ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent,
    RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DefaultLayoutComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';
  showPassword: boolean = false;  // ✅ Variable to track visibility
  loginAttempts: number = 0;
  isLocked: boolean = false;
  lockoutTime: number = 120; // 2 minutes in seconds
  countdownTimer: any;

  public visible = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;  // ✅ Toggle the value
  }

  handleLiveDemoChange(event: boolean) {
    this.visible = event;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public loginService: LoginService  // ✅ Inject LoginService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for easy form control access
  get f() {
    return this.loginForm.controls;
  }

   // ✅ Function to Reset Login Attempts
   resetLoginAttempts() {
    this.loginAttempts = 0;
    this.isLocked = false;
    clearInterval(this.countdownTimer);
  }

   // ✅ Function to Start Lockout Timer
   startLockoutTimer() {
    this.isLocked = true;
    this.countdownTimer = setInterval(() => {
      if (this.lockoutTime > 0) {
        this.lockoutTime--;
      } else {
        this.resetLoginAttempts();
      }
    }, 1000);
  }

  login() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.isLocked) {
      this.errorMessage = `Too many failed attempts. Try again in ${this.lockoutTime} seconds.`;
      return;
    }

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.loginService.login(username, password).subscribe(
      (response) => {
        if (response) {
          alert('Login successful!');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/master']);
          this.toggleLiveDemo();
          this.closeLoginModal();
          this.resetLoginAttempts();
        } else {
          this.handleFailedLogin();
          this.errorMessage = 'Invalid username or password';
        }
      },
      (error) => {
        this.handleFailedLogin();
        alert('Invalid username or password !');
        console.error('Invalid username or password', error);
        this.errorMessage = 'Invalid username or password';
      }
    );
  }

  // ✅ Handle Failed Login Attempt
  handleFailedLogin() {
    this.loginAttempts++;
    if (this.loginAttempts >= 3) {
      this.errorMessage = 'Too many failed attempts. Please wait for 2 minutes.';
      this.startLockoutTimer();
    } else {
      this.errorMessage = `Invalid username or password. Attempts left: ${3 - this.loginAttempts}`;
    }
  }

  toggleLiveDemo() {
    this.visible = !this.visible;

    if (!this.visible) {
      this.closeLoginModal();  // Reset form when modal is closed
    }
  }

  // Function to reset form fields
  closeLoginModal() {
    this.submitted = false;
    this.loginForm.reset();
  }
  public navItems = [...navItems];
}
