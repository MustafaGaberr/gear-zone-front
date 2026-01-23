import { ChangeDetectorRef, Component, inject, NgModule, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
// import { ToastrService } from 'ngx-toastr';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-register',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  showPassword = false;
  showConfirmPassword = false;
  selectedAccountType: string | null = null;
  resulat:string=''

  accountInfoForm!: FormGroup;
  accountTypeForm!: FormGroup;
  

  private readonly authService = inject(AuthService)
  private readonly route = inject(Router)
  private readonly fb = inject(FormBuilder)
  private readonly changeDetectorRef = inject(ChangeDetectorRef)
  // private readonly toastrService=inject(ToastrService)

  initForms(): void {
    this.accountInfoForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      userName:new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern((/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/))]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{7,}$/)]),
      phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
    },{validators:this.confirmPassword});

    this.accountTypeForm = new FormGroup({
      accountType: new FormControl('', Validators.required)
    });
  }
 
  ngOnInit(): void {
    this.initForms()
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

  confirmPassword(group:AbstractControl){
    let password=group.get('password')?.value
    let confirmPassword=group.get('confirmPassword')?.value

    if(password=== confirmPassword){
      return null;
    }else{
      return { mismatch: true }
    }
  }
  register() {
  // console.log('Register clicked');
  // console.log('Form valid?', this.accountInfoForm.valid, this.accountTypeForm.valid);

  if (this.accountInfoForm.valid && this.accountTypeForm.valid) {
    const registerData = {
      ...this.accountInfoForm.value,
      role: this.accountTypeForm.get('accountType')?.value
    };

    // console.log('Sending data:', registerData);

    this.authService.getRegisterApi(registerData).subscribe({
      next: (res) => {
        if(res.status==='success')
          {
           
            this.resulat=res.data.user
             console.log('Success response:', this.resulat);
            //  this.toastrService.success('sucess')
            this.route.navigate(['/login'])


          }
      },
      
    });
  }
}


}
