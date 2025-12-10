import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications = [
    {
      id: 1,
      type: 'order',
      icon: 'bi-box-seam',
      iconClass: 'bg-primary-subtle text-primary',
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped and is on its way!',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'promo',
      icon: 'bi-tag',
      iconClass: 'bg-danger-subtle text-danger',
      title: 'Flash Sale!',
      message: '50% off on all brake pads. Limited time offer!',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'review',
      icon: 'bi-star',
      iconClass: 'bg-warning-subtle text-warning',
      title: 'Review Request',
      message: 'How was your Premium Brake Disc Set? Leave a review!',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'order',
      icon: 'bi-check-circle',
      iconClass: 'bg-success-subtle text-success',
      title: 'Order Delivered',
      message: 'Your order #12343 has been delivered successfully.',
      time: '3 days ago',
      read: true
    },
    {
      id: 5,
      type: 'system',
      icon: 'bi-info-circle',
      iconClass: 'bg-info-subtle text-info',
      title: 'Account Updated',
      message: 'Your account information has been updated successfully.',
      time: '1 week ago',
      read: true
    }
  ];

  markAsRead(notification: any) {
    notification.read = true;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  }

  get unreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }
}

