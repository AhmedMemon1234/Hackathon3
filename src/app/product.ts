// src/product.ts (or the relevant file for your Product type)
export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: any,
    rating: number; // Add this line to reflect the rating field
    sizes?: string[];       // Array of available sizes
    colors?: string[];      // Array of color options
    comments?: string[];
    id: string;        // Unique ID for each product  
    slug:any;
    quantity: number; // Add quantity here 
    isNew?: boolean; // Add this property if possible
    createdAt: string; // Add createdAt here
    category: string; // Add category here
  }
  