import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventComponent } from './containers/event/event.component';
import { AddAttendeeComponent } from './components/add-attendee/add-attendee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventListComponent } from './components/event-list/event-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../app.db';

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
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }),
  ]
})
export class EventModule { }
