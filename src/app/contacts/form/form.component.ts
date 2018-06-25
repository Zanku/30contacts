import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() contact: Contact
  
  @Output() cancel = new EventEmitter<void>()
  @Output() save = new EventEmitter<Contact>()

  constructor() { }

  onCancelClick(event){
    event.preventDefault();
    this.cancel.emit();
  }

  onFormSubmit(event, form){
    event.preventDefault();

    form.valid && this.save.emit(this.contact);
  }
}
