import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // Injections
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);

  // Product data
  product: Product | null = null;
  isLoading = true;

  // Quantity counter
  count = signal(1);

  // Images
  productImages: string[] = [];
  currentMainImage: string = '';

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.getProductDetails(productId);
      }
    });
  }

  getProductDetails(productId: string): void {
    this.isLoading = true;
    this._ProductsService.getProductById(productId).subscribe({
      next: (res) => {
        this.product = res.data;

        // Set up images - use imageCover as main, add any additional images
        if (this.product) {
          this.productImages = [this.product.imageCover];

          // Add additional images if available
          if (this.product.images && this.product.images.length > 0) {
            this.productImages = [...this.productImages, ...this.product.images];
          }

          this.currentMainImage = this.productImages[0];
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        this.isLoading = false;
      }
    });
  }

  changeImage(imagePath: string): void {
    this.currentMainImage = imagePath;
  }

  increment(): void {
    this.count.update(n => n + 1);
  }

  decrement(): void {
    this.count.update(n => (n > 1 ? n - 1 : 1));
  }

  addToCart(): void {
    if (this.product) {
      this._CartService.addToCart(this.product._id).subscribe({
        next: (res) => {
          alert('تمت الإضافة إلى السلة ✓');
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
        }
      });
    }
  }

  // Calculate discount percentage
  getDiscountPercentage(): number {
    if (this.product && this.product.priceAfterDiscount && this.product.price) {
      return Math.round(((this.product.price - this.product.priceAfterDiscount) / this.product.price) * 100);
    }
    return 0;
  }
}
