import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  
  showPassword = false;
  loginForm!: FormGroup;

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);

  initForms(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
    });
  }

  ngOnInit(): void {
    this.initForms();
  }

  login() {
    if (this.loginForm.valid) {
      this.loginForm.disable(); 

      this.authService.getLoginApi(this.loginForm.value).subscribe({
        next: (res) => {
          
          if (res.status === 'success' || res.token) {
            this.toastrService.success('Welcome back!', 'Login Successful');
            this.router.navigate(['/home']);
          }
          
          this.loginForm.enable();
        },
        error: (err) => {
          this.loginForm.enable();
          console.error(err);
          if (err.status === 0) {
            this.toastrService.error('Cannot connect to server. Please make sure the backend server is running.', 'Connection Error');
          } else {
            this.toastrService.error(err.error?.message || 'Invalid email or password', 'Login Failed');
          }
        }
      });
    } else {
this.loginForm.markAllAsTouched();    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}