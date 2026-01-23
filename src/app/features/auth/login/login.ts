import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports:[CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,RouterLink],
    
  templateUrl: './login.html',
  styleUrl: './login.css', // صححت styleUrls
})
export class Login  implements OnInit{
  showPassword = false;
  loginForm!: FormGroup;

  private readonly router=inject(Router)
  private readonly cookieService=inject(CookieService)
  
  private readonly authService = inject(AuthService)
  private readonly toastrService=inject(ToastrService)


  initForms(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern((/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/))]),
      
    });

    
  }

  ngOnInit(): void {
    this.initForms()
  }
  login() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService.getLoginApi(loginData).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            
            this.cookieService.set('token',res.data.token)
            
            this.toastrService.success('Login successful');
            this.router.navigate(['/home']); 
          } 
        }
      });
    } 
  }

 

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
