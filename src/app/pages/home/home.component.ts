import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { WhyChooseComponent } from './components/why-choose/why-choose.component';
import { CtaSectionComponent } from './components/cta-section/cta-section.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    CategoriesSectionComponent,
    FeaturedProductsComponent,
    WhyChooseComponent,
    CtaSectionComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}

