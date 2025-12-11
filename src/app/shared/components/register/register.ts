import { Component } from '@angular/core';
import { faEnvelope, faLock, faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEye = faEye;
  faUser = faUser;

  currentStep: number = 1;
  
  constructor(private router: Router) {}
  
  nextStep() {
    this.router.navigate(['/regster2']);
  }

  goBack() {
    this.currentStep--; // This might not be directly used here, but good for consistency
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
