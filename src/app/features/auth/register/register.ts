import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, MatIconModule, MatStepperModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
export class Register {
  showPassword = false;
  showConfirmPassword = false;
  selectedAccountType: string | null = null;
  
  accountInfoForm: FormGroup;
  accountTypeForm: FormGroup;

  constructor(private router: Router,private authService: AuthService, private fb: FormBuilder) {
    this.accountInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.accountTypeForm = this.fb.group({
      accountType: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  selectAccountType(type: string) {
    this.selectedAccountType = type;
    this.accountTypeForm.patchValue({ accountType: type });
  }

 onSubmit() {
  if (this.accountInfoForm.valid && this.selectedAccountType) {
    
    const info = this.accountInfoForm.value;

    const registerData = {
      name: `${info.firstName} ${info.lastName}`.trim(), 
      email: info.email,
      password: info.password,
      role: this.selectedAccountType 
    };

    console.log('Sending payload:', registerData);

    this.authService.signup(registerData).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed', error);
      },
    });
  }
}
}
