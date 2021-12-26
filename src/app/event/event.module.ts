import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventComponent } from './containers/event/event.component';
import { AddAttendeeComponent } from './components/add-attendee/add-attendee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventListComponent } from './components/event-list/event-list.component';

import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './state';
import { HttpClientModule } from '@angular/common/http';

/* We will be following the presentational container component pattern to categorise our components into two groups. 
The Container components are the "Smart" components that do all the work to manage state, persisting data and navigating. 
The presentational components become the "dumb" components mainly focused on displaying data. */

@NgModule({
  declarations: [
    EventComponent,
    AddAttendeeComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: EventComponent }
    ]),
    ReactiveFormsModule,
    StoreModule.forFeature('event', reducers),
    EffectsModule.forFeature(effects),
    HttpClientModule
  ]
})
export class EventModule { }
