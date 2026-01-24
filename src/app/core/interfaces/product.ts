export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Brand {
  _id: string;
  name: string;
  image?: string;
}

export interface Product {
  _id: string;      
  name: string;       
  slug: string;
  description: string;
  stock: number;     
  price: number;       
  priceAfterDiscount?: number;
  imageCover: string;  
  images?: string[];   
  
  category: Category;  
  brand?: Brand;        
  
  ratingsAverage: number; 
  ratingsQuantity: number; 
  
  sold?: number;
  createdAt?: string;
  updatedAt?: string;
}