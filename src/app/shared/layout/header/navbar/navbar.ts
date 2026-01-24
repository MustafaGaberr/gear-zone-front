import { Component, Input , inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink ,RouterLinkActive } from '@angular/router';
const GZLogo = 'assets/images/GZ-Logo.png';
import { AuthService } from '../../../../core/services/auth.service';
interface CartItem {
  quantity: number;
  // add other properties as needed
}

interface User {
  type: string;
  name: string;
  avatar?: string;
  // add other properties as needed
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  public authService = inject(AuthService);
  @Input() transparent = false;

  @Input() cart: CartItem[] = [];
  @Input() user: User | null = null;
  @Input() notifications = 0;
  @Input() messages = 0;

  isMobileMenuOpen = false;
  isNotificationOpen = false;

  // In Angular you'll need to have this image in assets, e.g. src/assets/images/GZ-Logo.png
  logoImage = GZLogo;

  get cartItemCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }



  toggleNotification(): void {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }



  closeNotification(): void {
    this.isNotificationOpen = false;
  }
}
