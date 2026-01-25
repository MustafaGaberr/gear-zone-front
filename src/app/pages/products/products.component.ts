import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product, Category } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // Injections
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  public translationService = inject(TranslationService);

  // Data Variables
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];

  // Filter Variables
  searchTerm: string = '';
  selectedCategoryId: string = 'all';
  priceRange: number[] = [0, 50000];

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        console.log("products", res.data)
        this.filteredProducts = res.data;
      },
      error: (err) => console.error(err)
    });
  }

  getAllCategories() {
    // TODO: Implement categories service
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {

      // Search by name (Case Insensitive)
      const matchSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filter by category
      const matchCategory = this.selectedCategoryId === 'all' || product.category._id === this.selectedCategoryId;

      // Filter by price
      const finalPrice = product.priceAfterDiscount ? product.priceAfterDiscount : product.price;
      const matchPrice = finalPrice >= this.priceRange[0] && finalPrice <= this.priceRange[1];

      return matchSearch && matchCategory && matchPrice;
    });
  }

  onCategoryChange(catId: string) {
    this.selectedCategoryId = catId;
    this.applyFilters();
  }

  addToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        alert(this.translationService.translate('products.addToCart') + ' ✓');
      }
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategoryId = 'all';
    this.priceRange = [0, 50000];
    this.applyFilters();
  }
}