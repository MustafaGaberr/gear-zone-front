import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  badge?: string;
}

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Premium Brake Disc Set',
      image: 'assets/images/product-1.jpg',
      rating: 4.8,
      reviewCount: 124,
      price: 149.99,
      originalPrice: 199.99,
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'High Performance Oil Filter',
      image: 'assets/images/product-2.jpg',
      rating: 4.6,
      reviewCount: 89,
      price: 24.99
    },
    {
      id: 3,
      name: 'Car Battery 12V 75Ah',
      image: 'assets/images/product-3.jpg',
      rating: 4.9,
      reviewCount: 203,
      price: 129.99,
      originalPrice: 159.99,
      badge: 'Hot Deal'
    },
    {
      id: 4,
      name: 'Engine Components Kit',
      image: 'assets/images/product-4.jpg',
      rating: 4.7,
      reviewCount: 156,
      price: 299.99
    }
  ];

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }
}

