import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Category {
  emoji: string;
  name: string;
  itemCount: string;
  bgColorClass: string;
}

@Component({
  selector: 'app-categories-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.css'
})
export class CategoriesSectionComponent {
  categories: Category[] = [
    { emoji: '🔧', name: 'Engine Parts', itemCount: '1,234 items', bgColorClass: 'bg-cat-blue' },
    { emoji: '🛑', name: 'Brake Systems', itemCount: '856 items', bgColorClass: 'bg-cat-red' },
    { emoji: '⚡', name: 'Electrical', itemCount: '672 items', bgColorClass: 'bg-cat-amber' },
    { emoji: '🔩', name: 'Suspension', itemCount: '543 items', bgColorClass: 'bg-cat-emerald' },
    { emoji: '💨', name: 'Exhaust', itemCount: '421 items', bgColorClass: 'bg-cat-indigo' },
    { emoji: '❄️', name: 'Cooling System', itemCount: '389 items', bgColorClass: 'bg-cat-rose' },
    { emoji: '⚙️', name: 'Transmission', itemCount: '512 items', bgColorClass: 'bg-cat-violet' },
    { emoji: '🛢️', name: 'Filters & Fluids', itemCount: '934 items', bgColorClass: 'bg-cat-pink' }
  ];
}
