import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Card, Set, SubSet } from '../app.interfaces';
import { startWith } from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
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
export class SearchComponent implements OnInit {
  filter: string;
  cards: Card[];
  sets: Set[];
  subSets: SubSet[];
  filteredCards: Observable<Card[]>;
  nameValidationHidden: string;
  numberValidationHidden: string;
  setValidationHidden: string;
  yearValidationHidden: string;
  newCard: Card;
  selectedCard: Card;
  newSet: Set;
  newSubSet: SubSet;
  selectedSetId: number;
  closeResult: string;

  constructor(private _apiService: ApiService, private modalService: NgbModal) {
    this.nameValidationHidden = "hidden";
    this.numberValidationHidden = "hidden";
    this.setValidationHidden = "hidden";
    this.yearValidationHidden = "hidden";
    this.newCard = this.initializeCard();
    this.newSet = this.initializeSet();
    this.newSubSet = this.initializeSubSet();
  }

  ngOnInit() {
    this._apiService.getCards()
      .subscribe
      (
        data => {
          this.cards = data;
          this.filteredCards = of(this.cards);
        }
    );

    this.getSets();
  }
  
  filterCard(): void {
    let name = (this.newCard.name == null ? '' : this.newCard.name);
    let number = (this.newCard.number == null ? '' : this.newCard.number);
    let set = (this.newCard.set == null ? '' : this.newCard.set);
    let subSet = (this.newCard.subSet == null ? '' : this.newCard.subSet);
    let year = (this.newCard.year == null ? '' : this.newCard.year.toString());

    this.filteredCards = of(
      this.cards.filter(
        card => card.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
          card.number.toLowerCase().indexOf(number.toLowerCase()) !== -1 &&
          card.set.toLowerCase().indexOf(set.toLowerCase()) !== -1 &&
          (card.subSet == null || card.subSet.toLowerCase().indexOf(subSet.toLowerCase()) !== -1) &&
          card.year.toString().toLowerCase().indexOf(year.toLowerCase()) !== -1
      )
    );
  }
  
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

  initializeSet(): Set {
    return {
      setId: 0,
      setName: ""
    }
  }

  initializeSubSet(): SubSet {
    return {
      subsetId: 0,
      setId: 0,
      subSetName: ""
    }
  }

  clear(): void {
    this.newCard = this.initializeCard();
    this.nameValidationHidden = "hidden";
    this.numberValidationHidden = "hidden";
    this.setValidationHidden = "hidden";
    this.yearValidationHidden = "hidden";
    this.filteredCards = of(this.cards);
    this.selectedSetId = null;
    this.getSets();
    this.getSubSets(0);
  }

  onSetChange(setId: string, setName: string): void {
    this.newCard.set = setName;
    this.selectedSetId = Number(setId);
    if (setId == '') {
      this.subSets = null;
      this.filterCard();
    } else {
      this._apiService.getSubSets((setId == '' ? 0 : Number(setId)))
        .subscribe
        (
          data => {
            this.subSets = data;
            this.filterCard();
          }
        );
    }

  }

  onSubSetChange(subSetName: string): void {
    this.newCard.subSet = subSetName;
    this.filterCard();
  }

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

  openAddSetModal(addSetContent): void {
    this.modalService.open(addSetContent, { centered: true });
  }

  openAddSubSetModal(addSubSetContent): void {
    this.modalService.open(addSubSetContent, { centered: true });
  }

  saveNewSet(): void {
    this.modalService.dismissAll();
    this.addSet();
  }

  saveNewSubSet(): void {
    this.modalService.dismissAll();
    this.addSubSet();
  }

  addSet(): void {
    this._apiService.addSet(this.newSet)
      .subscribe
      (
        data => {
          this.newSet = this.initializeSet();
          this.sets = data;
        }
    );
  }

  getSets(): void {
    this._apiService.getSets()
      .subscribe
      (
        data => {
          this.sets = data;
        }
      );
  }

  getSubSets(setId: number): void {
    this._apiService.getSubSets(setId)
      .subscribe
      (
        data => {
          this.subSets = data;
        }
      );
  }
  
  addSubSet(): void {
    this.newSubSet.setId = Number(this.selectedSetId);
    this._apiService.addSubSet(this.newSubSet)
      .subscribe
      (
        data => {
          this.newSubSet = this.initializeSubSet();
          this.subSets = data;
        }
    );

  }

  incrementCard(card: Card): void {
    this._apiService.incrementCard(card)
      .subscribe
      (
        data => {
          this.cards = data;
          this.filterCard();
        }
    );
  }

  decrementCard(card: Card): void {
    this._apiService.decrementCard(card)
      .subscribe
      (
        data => {
          this.cards = data;
          this.filterCard();
        }
    );
  }

  addCard(): void {
    if (this.validateForm()) {
      this._apiService.addCard(this.newCard)
        .subscribe
        (
          data => {
            //this.getSets();
            //this.getSubSets(0);
            //this.newCard = this.initializeCard();
            this.cards = data;
            this.filterCard();
          }
      );

    }
  }

}
