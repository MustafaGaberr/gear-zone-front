import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
  gradientClass: string;
}

@Component({
  selector: 'app-why-choose',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose.component.html',
  styleUrl: './why-choose.component.css'
})
export class WhyChooseComponent {
  features: Feature[] = [
    {
      icon: 'bi-shield-check',
      title: 'Verified Sellers',
      description: 'All sellers are verified and rated by our community for your peace of mind',
      gradientClass: 'gradient-blue'
    },
    {
      icon: 'bi-award',
      title: 'Quality Guarantee',
      description: 'Every part comes with a quality guarantee and easy returns within 30 days',
      gradientClass: 'gradient-green'
    },
    {
      icon: 'bi-truck',
      title: 'Fast Delivery',
      description: 'Get your parts delivered quickly with tracked shipping and real-time updates',
      gradientClass: 'gradient-orange'
    }
  ];
}
