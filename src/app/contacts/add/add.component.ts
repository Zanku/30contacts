import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/Contact';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent{
  contact = new Contact()

  constructor(
    protected contactsService: ContactsService,
    protected route: ActivatedRoute,
    protected router: Router
  ) { }

  goToList(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onFormCancel(){
    this.goToList();
  }

  onFormSave(contact: Contact){
    this.contactsService.save(contact)
      .subscribe(() => {
        this.goToList();
      })
  }
}
