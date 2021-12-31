import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './state/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';
import { ProductsComponent } from './containers/products/products.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { effects, reducers } from './state';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProductsComponent }
    ]),
    ReactiveFormsModule,
    StoreModule.forFeature('cart', reducers),
    EffectsModule.forFeature(effects),
    HttpClientModule

  ]
})
export class ProductsModule { }
