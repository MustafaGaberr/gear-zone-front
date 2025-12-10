import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
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
    console.log('Saving personal info:', this.user());
  }

  updatePassword() {
    if (this.passwords.new !== this.passwords.confirm) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Updating password');
    this.passwords = { current: '', new: '', confirm: '' };
  }

  saveNotifications() {
    console.log('Saving notifications:', this.notifications);
  }
}

