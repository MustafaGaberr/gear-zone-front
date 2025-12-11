import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBoxOpen, faStore, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-regster2',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './regster2.html',
  styleUrl: './regster2.css',
})
export class Regster2 {
  faBoxOpen = faBoxOpen;
  faStore = faStore;
  faCheck = faCheck;
  selectedAccountType: string | null = null;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/register']);
  }

  selectAccountType(type: string) {
    this.selectedAccountType = type;
    console.log('Selected account type:', this.selectedAccountType);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
