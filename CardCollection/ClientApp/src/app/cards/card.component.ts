import { Component, Inject, ViewEncapsulation, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getBaseUrl } from '../../main';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class CardComponent {
  //public cards: Card[];
  //public cards$: Observable<Card[]>;
  //public newCard: Card;
  //public newSet: Set;
  //public newSubSet: SubSet;
  //active = 1;
  //http: HttpClient;
  //baseUrl: string;
  //public selectedCard: Card;
  //public sets: Set[];
  //public subSets: SubSet[];
  //closeResult: string;
  //public selectedSetId: number;
  //public nameValidationHidden: string;
  //public numberValidationHidden: string;
  //public setValidationHidden: string;
  //public yearValidationHidden: string;
  //public textCount: number;
  filter: FormControl;
  //filteredCards$: Observable<Card[]>;
  //filter$: Observable<string>;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private modalService: NgbModal) {
    //this.nameValidationHidden = "hidden";
    //this.numberValidationHidden = "hidden";
    //this.setValidationHidden = "hidden";
    //this.yearValidationHidden = "hidden";
    //this.http = http;
    //this.baseUrl = baseUrl;
    //this.getCards();
    //this.newCard = this.initializeCard();
    //this.newSet = this.initializeSet();
    //this.newSubSet = this.initializeSubSet();
    //this.getSets();
    //this.textCount = 0;

    //this.filter = new FormControl('');
    //this.filter$ = this.filter.valueChanges.pipe(startWith(''));

  }
  /*
  getCards(): void {
    this.http.get<Card[]>(this.baseUrl + 'card/GetCards').subscribe(result => {
      this.cards = result;
      this.cards$ = of(this.cards);
      if (this.newCard.name == null) {
        this.filteredCards$ = this.cards$;
      } else {
        this.filteredCards$ = combineLatest(this.cards$, this.filter$).pipe(
          map(([cards, filterString]) => cards.filter(c => c.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)));
      }
    })
  }
  

  incrementCard(card: Card): void {
    this.http.put<Card[]>(this.baseUrl + 'card/IncrementQuantity/' + card.cardId, {}).subscribe(result => {
      this.cards = result;
    })
  }

  decrementCard(card: Card): void {
    this.http.put<Card[]>(this.baseUrl + 'card/DecrementQuantity/' + card.cardId, {}).subscribe(result => {
      this.cards = result;
    })
  }

  addCard(): void {
    if (this.validateForm()) {
      const headers = new HttpHeaders().set('content-type', 'application/json');
      this.http.post<Card[]>(this.baseUrl + 'card/AddCard', this.newCard, { headers: headers }).subscribe(result => {
        this.getSets();
        this.getSubSets(0);
        this.newCard = this.initializeCard();
        this.cards = result;
      })
    }
  }
  */
  /*
  addSet(): void {
    this.http.post<Set[]>(this.baseUrl + 'card/AddSet', this.newSet).subscribe(result => {
      this.newSet = this.initializeSet();
      this.sets = result;
    })
  }

  addSubSet(): void {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    this.newSubSet.setId = Number(this.selectedSetId);
    this.http.post<SubSet[]>(this.baseUrl + 'card/AddSubSet', this.newSubSet, { headers: headers }).subscribe(result => {
      this.newSubSet = this.initializeSubSet();
      this.subSets = result;
    })
  }
  */

  /*
  initializeCard(): Card {
    return {
      cardId: 0,
      name: null,
      number: null,
      set: null,
      subSet: null,
      quantity: 1,
      year: null
    }
  }
  */

  /*
  initializeSet(): Set {
    return {
      setId: 0,
      setName: ""
    }
  }
  */

  /*
  initializeSubSet(): SubSet {
    return {
      subsetId: 0,
      setId: 0,
      subSetName: ""
    }
  }
  */

  /*
  clear(): void {
    this.newCard = this.initializeCard();
    this.nameValidationHidden = "hidden";
    this.numberValidationHidden = "hidden";
    this.setValidationHidden = "hidden";
    this.yearValidationHidden = "hidden";
  }
  */

  /*
  getSets(): void {
    this.http.get<Set[]>(this.baseUrl + 'card/GetSets').subscribe(result => {
      this.sets = result;
    },
      error => console.error(error));
  }
  */

  /*
  getSubSets(setId): void {
    this.http.get<SubSet[]>(this.baseUrl + 'card/GetSubSets/' + setId).subscribe(result => {
      this.subSets = result;
    },
      error => console.error(error));
  }
  */

  /*
  openAddSetModal(addSetContent) {
    this.modalService.open(addSetContent, { centered: true });
  }

  openAddSubSetModal(addSubSetContent) {
    this.modalService.open(addSubSetContent, { centered: true });
  }

  saveNewSet() {
    this.modalService.dismissAll();
    this.addSet();
  }

  saveNewSubSet() {
    this.modalService.dismissAll();
    this.addSubSet();
  }
*/

  /*
  onSetChange(setId: number, setName: string) {
    this.newCard.set = setName;
    this.selectedSetId = setId;
    this.getSubSets(setId);
  }
  */

  /*
  onSubSetChange(subSetName: string) {
    this.newCard.subSet = subSetName;
  }
  */

  /*
  validateForm(): boolean {
    let name = (<HTMLInputElement>document.getElementById("inputTextName")).value;
    let number = (<HTMLInputElement>document.getElementById("inputTextNumber")).value;
    let set = (<HTMLInputElement>document.getElementById("inputDropDownSet")).value;
    let year = (<HTMLInputElement>document.getElementById("inputNumberYear")).value;
    var result = true;

    if (name.trim() == '') {
      this.nameValidationHidden = "";
    } else {
      this.nameValidationHidden = "hidden"
    }

    if (number.trim() == '') {
      this.numberValidationHidden = "";
    } else {
      this.numberValidationHidden = "hidden";
    }

    if (set.trim() == '') {
      this.setValidationHidden = "";
    } else {
      this.setValidationHidden = "hidden";
    }

    if (year.trim() == '') {
      this.yearValidationHidden = "";
    } else {
      this.yearValidationHidden = "hidden";
    }

    if (this.nameValidationHidden == '' || this.numberValidationHidden == '' || this.setValidationHidden == '' || this.yearValidationHidden == '') {
      result = false;
    }
    return result;
  }
  */

}

