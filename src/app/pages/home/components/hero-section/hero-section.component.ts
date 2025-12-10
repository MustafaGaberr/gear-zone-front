import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  searchQuery = '';

  stats = [
    { icon: 'bi-box-seam', value: '50,000+', label: 'Products Listed' },
    { icon: 'bi-shop', value: '2,500+', label: 'Active Sellers' },
    { icon: 'bi-people', value: '15,000+', label: 'Happy Customers' }
  ];

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Navigate to products page with search query
      console.log('Searching for:', this.searchQuery);
    }
  }
}

