import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './features/products/models';
import data from 'src/assets/products.json';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = data.data as  Product[];
    console.log(products);
    return { products };
  }
}