import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {}

    getProducts(): Observable<Product[]> {
      return this.httpClient.get<Product[]>('/api/products');
    }
  
/*     addProduct(p: Product): Observable<Product> {
      return this.httpClient.post<Product>('/api/products', p);
    }
   */
}
