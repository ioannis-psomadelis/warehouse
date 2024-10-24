import { Injectable, signal } from '@angular/core';
import { Product } from '@models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = signal<Product[]>([]);

  constructor() {
    this.products.set([
      {
        id: 1,
        name: 'Eco-Friendly Water Bottle',
        description: 'A reusable water bottle made from sustainable materials.',
        quantity: 10,
        price: 9.99,
      },
      {
        id: 2,
        name: 'Wireless Headphones',
        description:
          'Noise-cancelling over-ear headphones with Bluetooth connectivity.',
        quantity: 5,
        price: 19.99,
      },
      {
        id: 3,
        name: 'Smart LED Bulb',
        description: 'Energy-efficient LED bulb with smart home integration.',
        quantity: 15,
        price: 29.99,
      },
      {
        id: 4,
        name: 'Portable Charger',
        description:
          'Compact and high-capacity power bank for charging devices on the go.',
        quantity: 20,
        price: 39.99,
      },
      // New products added below
      {
        id: 5,
        name: 'Bluetooth Speaker',
        description:
          'Portable speaker with high-quality sound and Bluetooth connectivity.',
        quantity: 8,
        price: 49.99,
      },
      {
        id: 6,
        name: 'Smart Watch',
        description: 'Wearable device with fitness tracking and notifications.',
        quantity: 12,
        price: 99.99,
      },
      {
        id: 7,
        name: 'Laptop Stand',
        description: 'Ergonomic stand for laptops with adjustable height.',
        quantity: 7,
        price: 29.99,
      },
      {
        id: 8,
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with adjustable DPI.',
        quantity: 14,
        price: 19.99,
      },
      {
        id: 9,
        name: 'USB-C Hub',
        description:
          'Multi-port hub for USB-C devices with HDMI and USB ports.',
        quantity: 10,
        price: 39.99,
      },
      {
        id: 10,
        name: 'Noise-Cancelling Earbuds',
        description: 'In-ear earbuds with active noise cancellation.',
        quantity: 6,
        price: 59.99,
      },
    ]);
  }

  getProducts() {
    return this.products.asReadonly();
  }

  editProduct(product: Product) {
    this.products.update((products) =>
      products.map((p) => (p.id === product.id ? product : p)),
    );
  }

  addProduct(product: Product) {
    const newId = Math.max(...this.products().map((p) => p.id), 0) + 1;
    this.products.update((products) => [
      ...products,
      { ...product, id: newId },
    ]);
  }

  deleteProduct(id: number) {
    this.products.update((products) => products.filter((p) => p.id !== id));
  }
}
