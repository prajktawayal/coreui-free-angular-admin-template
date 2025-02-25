import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective } from '@coreui/angular';
import { ImgModule } from '@coreui/angular';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // ✅ Import CommonModule

// import { IconDirective } from '@coreui/icons-angular';
import {
  AvatarModule,
  // ContainerComponent,
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
  // ModalFooterComponent,
  ModalHeaderComponent,
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
    // ContainerComponent,
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
    ShadowOnScrollDirective, ButtonDirective, ModalComponent, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalHeaderComponent,
    RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DefaultLayoutComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  public visible = false;

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

  login() {
    this.submitted = true;
    this.errorMessage = '';

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
          // this.closeLoginModal();
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      (error) => {
        alert('Login Failed!');
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password';
      }
    );
  }

  public navItems = [...navItems];
}
