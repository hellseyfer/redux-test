import { Action } from '@ngrx/store';
import { Product } from '../models';

export enum ProductsActionTypes {
  LoadProducts = '[Products Page] Load Products',
  LoadProductsSuccess = '[Products Page] Load Products Success',
  LoadProductsFailure = '[Products Page] Load Products Failure',
  FilterBy = '[Products Page] FilterBy'
}

export class LoadProducts implements Action {
  readonly type = ProductsActionTypes.LoadProducts;
}

export class LoadProductsSuccess implements Action {
  readonly type = ProductsActionTypes.LoadProductsSuccess;
  constructor(public payload: Product[]){}
}

export class LoadProductsFailure implements Action {
  readonly type = ProductsActionTypes.LoadProductsFailure;
  constructor(public payload: any){}
}

export class FilterBy implements Action {
  readonly type = ProductsActionTypes.FilterBy;
  constructor(public payload: string){}

}


export type ProductsActions =
  | LoadProducts
  | LoadProductsSuccess
  | LoadProductsFailure
  | FilterBy