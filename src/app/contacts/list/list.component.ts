import { Component, OnInit } from '@angular/core';
import { Contacts, Contact } from '../models/Contact';
import { Observable } from 'rxjs';
import { ContactsService } from '../contacts.service';
import { switchMap } from 'rxjs/internal/operators'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  dataSource$: Observable<Contacts>
  displayedColumns = ['id', 'name', 'surname', 'age', 'phone', 'email', 'actions']
  
  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.updateList();
  }

  updateList(){
    return this.dataSource$ = this.contactsService.list()
    // this.contactsService.list().subscribe((data) => console.log(data))
  }

  onDeleteClick(event, contact: Contact){
    event.stopPropagation();

    this.dataSource$ = this.contactsService.delete(contact).pipe(
      switchMap(() => this.updateList())
    );
  }

}
