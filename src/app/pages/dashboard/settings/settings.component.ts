import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
  import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIcon],

templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

private readonly authService=inject(AuthService)
private readonly toastrService=inject(ToastrService)
private readonly router=inject(Router)
private readonly cookieService=inject(CookieService)





  showPassword :boolean= false;
   togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  updatform!:FormGroup
  changPassword!:FormGroup
  // cookieService: any;

  initForm():void{
    this.updatform=new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),

    })
  }

  initPassword():void{
    this.changPassword=new FormGroup({
      currentPassword:new FormControl('',Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)),
      newPassword: new FormControl('',Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)),
      confirmPassword: new FormControl('',Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/))
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.initPassword()
  }

  
  user = signal({
    firstName: 'Mustafa',
    lastName: 'Gaber',
    email: 'Gabour@GearZone.com'
  });




  passwords = {
    current: '',
    new: '',
    confirm: ''
  };
  

  notifications = {
    orderUpdates: true,
    promotionalEmails: false,
    newsletter: true
  };

  savePersonalInfo() {
    // console.log('Saving personal info:', this.user());
       if(this.updatform.valid){
      this.authService.personalInformation(this.updatform.value).subscribe({
      next:(res)=>{
        if(res.status=== "success"){

          console.log(res.user)
          this.toastrService.success("User updated successfully")
          this.cookieService.delete('token', '/');
          this.cookieService.set('token', res.token,{path:'/'}); 
          this.router.navigate(['/home'])
          
        }
        

      }
    })
    }
  }

  updatePassword() {
  
  if (this.changPassword.invalid) {
    this.toastrService.error('Please fill all password fields')
    return;
  }

  
  if (this.passwords.new !== this.passwords.confirm) {
      this.toastrService.error('Passwords do not match!')
    return;
  }

  this.authService.personalInformation(this.changPassword.value).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        console.log(res)
        this.toastrService.success('Password updated successfully!')
        this.cookieService.delete('token', '/');
        this.cookieService.delete('token')
        this.router.navigate(['/login'])
      }
        // this.passwords = { current: '', new: '', confirm: '' };
      // } else {
      //   this.toastrService.error(res.message)
      // }
    }
  });
}


  saveNotifications() {
    console.log('Saving notifications:', this.notifications);
  }
}

