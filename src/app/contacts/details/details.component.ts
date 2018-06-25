import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/Contact';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, startWith } from 'rxjs/internal/operators'
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  contact$: Observable<Contact>

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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

  goToList(){
    this.router.navigate(['../'],{ relativeTo: this.route});
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
