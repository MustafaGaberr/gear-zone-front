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
    MatButtonModule],
    
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css', // صححت styleUrls
})
export class Forgotpassword  {}