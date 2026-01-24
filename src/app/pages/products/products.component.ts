import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProductsService } from '../../core/services/products.service';
import { Product, Category } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service'; 

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // Injections
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService); 

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
        console.log("products" , res.data)
        this.filteredProducts = res.data;
      },
      error: (err) => console.error(err)
    });
  }

  getAllCategories() {
    // this._CategoriesService.getAll().subscribe(...)
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      
      // أ. بحث بالاسم (Case Insensitive)
      const matchSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());

      // ب. فلترة بالتصنيف
      const matchCategory = this.selectedCategoryId === 'all' || product.category._id === this.selectedCategoryId;

      // ج. فلترة بالسعر (بنحسب على السعر النهائي سواء بخصم أو لا)
      const finalPrice = product.priceAfterDiscount ? product.priceAfterDiscount : product.price;
      const matchPrice = finalPrice >= this.priceRange[0] && finalPrice <= this.priceRange[1];

      return matchSearch && matchCategory && matchPrice;
    });
  }

  // دالة مساعدة لتغيير الكاتجوري
  onCategoryChange(catId: string) {
    this.selectedCategoryId = catId;
    this.applyFilters();
  }

  // دالة الإضافة للكارت
  addToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        alert('Product added to cart!'); // أو Toastr
      }
    });
  }
}