import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../models';
import { CartState } from '../../state';
import { LoadProducts } from '../../state/product.actions';
import { getFilteredProducts, getProducts } from '../../state/product.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  spinner$: Observable<boolean>;
  products$: Observable<Product[]>;
  
  constructor(private store: Store<CartState>, private router: Router) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(getFilteredProducts));
    this.store.dispatch(new LoadProducts());
  }

  navigate(e) {
    const filterBy = e.target.value;
    this.router.navigateByUrl(`/products?filterBy=${filterBy}`);
  }

}
