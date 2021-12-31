import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/containers/home/home.component';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './app.db';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'event', loadChildren: () => import('./event/event.module').then(m => m.EventModule) }
    ]),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Demo App',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),  // The feature effects and reducers we make are then added to them as we lazily load them
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 1000 }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
