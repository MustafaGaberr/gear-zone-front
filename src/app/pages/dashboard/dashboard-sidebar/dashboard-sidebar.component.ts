import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
}

