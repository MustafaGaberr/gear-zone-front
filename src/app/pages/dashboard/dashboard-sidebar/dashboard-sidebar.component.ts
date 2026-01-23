import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css',
})
export class DashboardSidebarComponent {
  isOpen = input<boolean>(false);
  closeSidebar = output<void>();

  private readonly authService=inject(AuthService)

  links = [
    { label: 'Profile', icon: 'bi-person', path: 'profile' },
    { label: 'Settings', icon: 'bi-gear', path: 'settings' },
    { label: 'My Orders', icon: 'bi-box-seam', path: 'orders' },
    { label: 'Notifications', icon: 'bi-bell', path: 'notifications' },
    { label: 'Messages', icon: 'bi-chat-left-text', path: 'messages' },
  ];

  onLinkClick() {
    this.closeSidebar.emit();
  }

  onClose() {
    this.closeSidebar.emit();
  }
  logout(){
    this.authService.logout()
    
  }
}

