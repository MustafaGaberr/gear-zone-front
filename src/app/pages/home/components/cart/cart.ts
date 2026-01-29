import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';
import { Cartt } from '../../../../core/interfaces/cart';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {

  private readonly cartService = inject(CartService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly changeDetectorRef = inject(ChangeDetectorRef)

  id: string | null = null;


  cartDetails: Cartt = {} as Cartt;

  shippingCost: number = 15.99;
  taxRate: number = 0.08;
  taxAmount: number = 0;
  grandTotal: number = 0;

  ngOnInit(): void {
    this.getProductId();
    this.getloggedusercart()
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParms) => {
        this.id = urlParms.get('id');
      },
    });
  }

  getloggedusercart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data)
        this.cartDetails = res.data
        this.calculateTotals();
        this.changeDetectorRef.detectChanges()

      }
    })
  }
  updateCartProductQuantity(id: string, quantity: number): void {
    if (quantity < 1) return; 
    this.cartService.updateCartProductQuantity(id, quantity).subscribe({
      next: (res) => {
        this.cartDetails.cartItems = res.data?.cartItems || [];
        this.cartDetails.totalCartPrice = res.data?.totalCartPrice || 0;
        this.calculateTotals();
        this.changeDetectorRef.detectChanges();
      }
    });

  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.cartDetails.cartItems = [];
          this.cartDetails.totalCartPrice = 0;
          this.calculateTotals();
          this.changeDetectorRef.detectChanges();
        }
      }

    });
  }

  removeSpecificCartItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.cartItems = res.data?.cartItems || [];
        this.cartDetails.totalCartPrice = res.data?.totalCartPrice || 0;
        this.calculateTotals();
        this.changeDetectorRef.detectChanges();


      },

    });
  }

  calculateTotals(): void {
    // Ensure totalCartPrice is a number
    const subtotal = this.cartDetails.totalCartPrice || 0;

    // Calculate tax
    this.taxAmount = subtotal * this.taxRate;

    // Calculate grand total (Subtotal + Tax + Shipping)
    // Only add shipping if cart is not empty
    if (subtotal > 0) {
      this.shippingCost = 15.99;
      this.grandTotal = subtotal + this.taxAmount + this.shippingCost;
    } else {
      this.shippingCost = 0; // Or keep it visible but total is 0? usually 0 if empty
      this.taxAmount = 0;
      this.grandTotal = 0;
    }
  }
}
