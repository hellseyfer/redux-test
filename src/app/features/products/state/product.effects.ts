import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, filter, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ProductService } from '../services/product.service';
import * as ProductActions from './product.actions';
import { Product } from '../models';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';

@Injectable()
export class ProductEffects {
  constructor(private _ps: ProductService, private actions$: Actions) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.ProductsActionTypes.LoadProducts),
      switchMap((action: ProductActions.LoadProducts) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this._ps.getProducts().pipe(
          map(
            (products: Product[]) =>
              new ProductActions.LoadProductsSuccess(products)
          ),
          catchError((error) =>
            of(new ProductActions.LoadProductsFailure(error))
          )
        )
      )
    );
  });

  loadDiaryHealthActions$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    map((r: RouterNavigationAction) => ({
      url: r.payload.routerState.url,
      filterBy: r.payload.routerState.root.queryParams['filterBy']
    })),
    filter(({ url, filterBy }) => url.startsWith('/products')),
    map(({ filterBy }) => new ProductActions.FilterBy(filterBy))
  )});
  
}
