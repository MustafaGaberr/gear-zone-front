import { Component } from '@angular/core';
import { faEnvelope, faLock, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEye = faEye;

  constructor(private router: Router) {}
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
