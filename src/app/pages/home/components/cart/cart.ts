import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { TranslationService } from '../../../../core/services/translation.service';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    imageCover: string;
    price: number;
    slug: string;
  };
  quantity: number;
  color?: string;
  price: number;
}

interface CartData {
  _id: string;
  cartItems: CartItem[];
  totalCartPrice: number;
  totalCartPriceAfterDiscount?: number;
  user: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private readonly cartService = inject(CartService);
  public translationService = inject(TranslationService);

  cart: CartData | null = null;
  loading = true;
  updating = false;

  // Fixed costs
  readonly shippingCost = 15.99;
  readonly taxRate = 0.08; // 8%

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cart = res.data;
        this.loading = false;
      },
      error: (err) => {
        // 404 means cart is empty
        if (err.status === 404) {
          this.cart = null;
        }
        this.loading = false;
      }
    });
  }

  get subtotal(): number {
    return this.cart?.totalCartPrice || 0;
  }

  get tax(): number {
    return this.subtotal * this.taxRate;
  }

  get total(): number {
    if (!this.cart || this.cart.cartItems.length === 0) return 0;
    return this.subtotal + this.shippingCost + this.tax;
  }

  get isEmpty(): boolean {
    return !this.cart || this.cart.cartItems.length === 0;
  }

  updateQuantity(itemId: string, newQuantity: number): void {
    if (newQuantity < 1 || this.updating) return;

    this.updating = true;
    this.cartService.updateCartProductQuantity(itemId, newQuantity).subscribe({
      next: (res) => {
        this.cart = res.data;
        this.updating = false;
      },
      error: () => {
        this.updating = false;
      }
    });
  }

  removeItem(itemId: string): void {
    if (this.updating) return;

    this.updating = true;
    this.cartService.removeSpecificCartItem(itemId).subscribe({
      next: (res) => {
        this.cart = res.data;
        this.updating = false;
      },
      error: () => {
        this.updating = false;
      }
    });
  }

  clearAllItems(): void {
    if (this.updating || this.isEmpty) return;

    this.updating = true;
    this.cartService.clearCart().subscribe({
      next: () => {
        this.cart = null;
        this.updating = false;
      },
      error: () => {
        this.updating = false;
      }
    });
  }

  getItemTotal(item: CartItem): number {
    return item.quantity * item.price;
  }
}
