import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  badge?: string;        
  originalPrice?: number; 
}
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
 count = signal(1);
  productImages: string[] = [
    'assets/images/product-1.jpg',
    'assets/images/product-2.jpg',
    'assets/images/product-3.jpg'
  ];
  currentMainImage: string = this.productImages[0];

  changeImage(imagePath: string) {
    this.currentMainImage = imagePath;
  }
increment() {
    this.count.update(n => n + 1);
  }
decrement() {
    this.count.update(n => (n > 1 ? n - 1 : 1));
}
products: Product[] = [
    {
      id: 1,
      name: 'Wireless Noise Cancelling Headphones',
      image: 'assets/images/ProductDetail.png', 
      price: 299.99,
      originalPrice: 350.00,
      rating: 4.8,
      reviewCount: 120,
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Smart Watch Series 7',
      image: 'assets/images/ProductDetail2.png',
      price: 399.00,
      rating: 4.5,
      reviewCount: 85,
    },
    {
      id: 3,
      name: 'Ergonomic Office Chair',
      image: 'assets/images/ProductDetail3.png',
      price: 150.50,
      originalPrice: 200.00,
      rating: 4.2,
      reviewCount: 40,
      badge: 'Sale'
    },
   
  ];
}
