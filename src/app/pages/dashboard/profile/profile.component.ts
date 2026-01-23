import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user = signal({
    id: '123',
    name: 'Mustafa Gaber',
    email: 'Gabour@GearZone.com',
    phone: '+20 123 456 7890',
    role: 'Premium Member',
    joinDate: new Date('2024-01-01'),
    location: 'New York, NY'
  });
    
  stats = {
    totalOrders: 24,
    reviewsGiven: 18,
    wishlistItems: 12
  };

  recentOrders = [
    { id: '#12345', status: 'Delivered', name: 'Premium Brake Disc Set', date: 'Dec 5, 2024', price: '$149.99', statusClass: 'status-delivered' },
    { id: '#12344', status: 'In Transit', name: 'High Performance Oil Filter', date: 'Nov 28, 2024', price: '$24.99', statusClass: 'status-transit' },
    { id: '#12343', status: 'Delivered', name: 'Car Battery 12V 75Ah', date: 'Nov 15, 2024', price: '$129.99', statusClass: 'status-delivered' }
  ];
}
