import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Attendee } from '../../../models';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-attendee',
  templateUrl: './add-attendee.component.html',
  styleUrls: ['./add-attendee.component.scss']
})
//this is a Presentational component

export class AddAttendeeComponent {
  @Output()
  addAttendee = new EventEmitter<Attendee>();
  
  addAttendeeForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  submit() {
    const attendee = {
      id: 0,
      name: this.addAttendeeForm.value.name,
      attending: true,
      guests: 0
    };
    this.addAttendee.emit(attendee);
    console.log('TCL: AddAttendeeComponent -> submit -> attendee', attendee);
  }

}
