import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../models';
import * as ProductActions from './product.actions';
import { ProductsActions } from './product.actions';

export const productFeatureKey = 'products';


export interface State extends EntityState<Product> {
  loading: boolean;
  error: any;
  filterBy: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
  filterBy: 'all'
})


export function reducer(state = initialState, action: ProductsActions): State {
  switch(action.type){
    case ProductActions.ProductsActionTypes.LoadProducts: {
      return adapter.removeAll({
        ...state,
        loading: true,
        error: null
      })
    }
    case ProductActions.ProductsActionTypes.LoadProductsSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        error: null
      })
    }
    case ProductActions.ProductsActionTypes.LoadProductsFailure: {
      return adapter.removeAll({
        ...state,
        loading: false,
        error: action.payload
      })
    }

    case ProductActions.ProductsActionTypes.FilterBy: {
      return { ...state, filterBy: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();