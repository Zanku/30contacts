import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/Contact';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, startWith } from 'rxjs/internal/operators'
import { ContactsService } from '../contacts.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends AddComponent implements OnInit {
  contact$: Observable<Contact>

  ngOnInit() {
    this.updateContactStream()
  }

  updateContactStream(){
    this.contact$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = Number(params.get('id'));

        return  this.contactsService.get(id);
      }),
      startWith(new Contact)
    )
  }
}
