import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

//Services
import { AuthService } from '@services/auth.service';
import { MessagingService } from '@services/messaging.service';

//Primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

//Models
import { UserLogin, UserRole } from '@models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  providers: [MessagingService],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  //getters
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  authService = inject(AuthService);
  router = inject(Router);
  messagingService = inject(MessagingService);

  loginForm!: FormGroup;
  loading = false;
  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.loading = true;
    const userLogin: UserLogin = {
      username: this.username?.value,
      password: this.password?.value,
    };

    this.authService.login(userLogin).subscribe((role: UserRole | null) => {
      if (role) {
        this.navigateBasedOnRole(role);
        this.loading = false;
      } else {
        this.loginForm.reset();
        this.loading = false;
        this.messagingService.showError('Λανθασμένο όνομα χρήστη ή κωδικός');
      }
    });
  }

  navigateBasedOnRole(role: UserRole) {
    const roleRoutes: Record<string, string> = {
      admin: '/admin-dashboard',
      user: '/user-dashboard',
    };
    const route = roleRoutes[role] || '/';
    this.messagingService.showSuccess('Επιτυχής σύνδεση');
    return this.router.navigate([route]).then(() => of(null));
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
