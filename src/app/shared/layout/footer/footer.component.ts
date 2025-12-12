import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

const GZLogo = 'assets/images/GZ-Logo.png';

interface FooterLink {
  label: string;
  routerLink?: string;
  href?: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  logoImage = GZLogo;
  currentYear = new Date().getFullYear();

  quickLinks: FooterLink[] = [
    { label: 'Products', routerLink: '/products' },
    { label: 'Become a Seller', routerLink: '/register', },
    { label: 'Login', routerLink: '/login' }
  ];

  supportLinks: FooterLink[] = [
    { label: 'Help Center', routerLink: '/help' },
    { label: 'Contact Us', routerLink: '/contact' },
    { label: 'FAQs', routerLink: '/faqs' }
  ];

  legalLinks: FooterLink[] = [
    { label: 'Privacy Policy', routerLink: '/privacy' },
    { label: 'Terms of Service', routerLink: '/terms' },
    { label: 'Cookie Policy', routerLink: '/cookies' }
  ];
}

