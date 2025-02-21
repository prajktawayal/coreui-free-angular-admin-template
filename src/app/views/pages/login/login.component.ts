import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink,Router  } from '@angular/router';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { NgModule } from '@angular/core';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle,RouterLink]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  // Dummy credentials
  private validUsers = [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'password1' }
  ];

  constructor(private router: Router) {}

  login() {
    const user = this.validUsers.find(u => u.username === this.username && u.password === this.password);
    if (user) {
      alert('Login successful!');
      this.router.navigate(['/dashboard']); // Redirect to dashboard after login
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
