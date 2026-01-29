import { Component, Input, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
const GZLogo = 'assets/images/GZ-Logo.png';
import { AuthService } from '../../../../core/services/auth.service';
import { TranslationService } from '../../../../core/services/translation.service';

interface CartItem {
  quantity: number;
}

interface User {
  type: string;
  name: string;
  avatar?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  public authService = inject(AuthService);
  public translationService = inject(TranslationService);
  private elementRef = inject(ElementRef);

  @Input() transparent = false;

  @Input() cart: CartItem[] = [];
  @Input() user: User | null = null;
  @Input() notifications = 0;
  @Input() messages = 0;

  isMobileMenuOpen = false;
  isNotificationOpen = false;
  isUserMenuOpen = false;

  logoImage = GZLogo;

  get cartItemCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleNotification(): void {
    this.isNotificationOpen = !this.isNotificationOpen;
    this.isUserMenuOpen = false;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    this.isNotificationOpen = false;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  closeNotification(): void {
    this.isNotificationOpen = false;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  logout(): void {
    this.closeUserMenu();
    this.authService.logout();
  }

  switchLanguage(): void {
    this.translationService.switchLanguage();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
      this.isNotificationOpen = false;
    }
  }
}
