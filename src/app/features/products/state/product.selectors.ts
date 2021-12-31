import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '.';
import * as fromProduct from './product.reducer';

export const getCartState = createFeatureSelector<CartState>('cart');

export const getProductState = createSelector(
  getCartState,
  (state) => state.products
);

export const getProducts = createSelector(
  getProductState,
  fromProduct.selectAll
);

export const getFilterBy = createSelector(
  getProductState,
  (state) => state.filterBy
);

export const getFilteredProducts = createSelector(
  getProducts,
  getFilterBy,
  (products, filterBy) =>
    products.filter((p) =>
      filterBy == 'all' ? true : 
      filterBy == 'epic' ? p.category == 'epic' : 
      filterBy == 'normal' ? p.category == 'normal' :
      filterBy == 'rare' ? p.category == 'rare' :
      filterBy == 'unique' ? p.category == 'unique' :
      true
    )
);
