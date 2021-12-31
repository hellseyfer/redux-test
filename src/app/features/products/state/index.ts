import { ActionReducerMap } from '@ngrx/store';

import * as fromRoot from 'src/app/reducers';
import * as fromProducts from './product.reducer';
import { ProductEffects } from './product.effects';

export interface CartState {
    products: fromProducts.State;
}

export interface State extends fromRoot.State {
    cart: CartState;
}

export const reducers: ActionReducerMap<CartState> = {
    products: fromProducts.reducer
}

export const effects: any[] = [ProductEffects]