import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Card, Set, SubSet, PageConfig } from '../app.interfaces';
import { startWith } from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { createElementCssSelector } from '@angular/compiler';

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
  start: number;
  end: number;
  pageSize: number;
  currentPage: number;
  numberOfCards: number;
  numberOfPages: Array<number>;
  pages: Array<PageConfig>;
  modifiedCard: Card;

  constructor(private _apiService: ApiService, private modalService: NgbModal) {
    this.nameValidationHidden = "hidden";
    this.numberValidationHidden = "hidden";
    this.setValidationHidden = "hidden";
    this.yearValidationHidden = "hidden";
    this.newCard = this.initializeCard();
    this.newSet = this.initializeSet();
    this.newSubSet = this.initializeSubSet();
    this.start = 0;
    this.end = 0;
    this.pageSize = 1000;
    this.currentPage = 1;
    this.pages = new Array<PageConfig>();
  }

  ngOnInit() {
    this._apiService.getCards()
      .subscribe
      (
        data => {
          this.cards = data;
          this.numberOfCards = this.cards.length;
          for (var i = 1; i <= Math.round(this.numberOfCards / this.pageSize); i++) {
            var page: PageConfig = {
              class: (i == 1 ? 'page-item active' : 'page-item'),
              pageNumber: i
            };
            this.pages.push(page);
          }
          //this.numberOfPages = Array(Math.round(this.numberOfCards / this.pageSize)).fill(0).map((x, i) => i+1);
          this.filteredCards = of(this.cards.slice(this.start, this.pageSize + this.start));
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

    if (this.newCard.subSet == null) {
      this.filteredCards = of(
        this.cards.filter(
          card => card.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
            card.number.toLowerCase().indexOf(number.toLowerCase()) !== -1 &&
            card.set.toLowerCase().indexOf(set.toLowerCase()) !== -1 &&
            (card.subSet == null || card.subSet.toLowerCase().indexOf(subSet.toLowerCase()) !== -1) &&
            card.year.toString().toLowerCase().indexOf(year.toLowerCase()) !== -1
        ).slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize)
      );
    } else {
      this.filteredCards = of(
        this.cards.filter(
          card => card.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
            card.number.toLowerCase().indexOf(number.toLowerCase()) !== -1 &&
            card.set.toLowerCase().indexOf(set.toLowerCase()) !== -1 &&
            (card.subSet !== null && card.subSet.toLowerCase().indexOf(subSet.toLowerCase()) !== -1) &&
            card.year.toString().toLowerCase().indexOf(year.toLowerCase()) !== -1
        ).slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize)
      );
    }
    
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
    this.filteredCards = of(this.cards.slice(this.start, this.pageSize + this.start));
    this.selectedSetId = null;
    this.getSets();
    this.getSubSets(0);
    document.getElementById('inputTextName').focus();
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

  openEditCardModal(editCard, card: Card): void {
    this.modifiedCard = card;
    this.modalService.open(editCard, { centered: true });
  }

  saveCard(): void {
    this.modalService.dismissAll();
    this.updateCard();
  }

  saveNewSet(): void {
    this.modalService.dismissAll();
    this.addSet();
  }

  saveNewSubSet(): void {
    this.modalService.dismissAll();
    this.addSubSet();
  }

  updateCard(): void {
    this._apiService.updateCard(this.modifiedCard)
      .subscribe
      (
        data => {
          this.cards = data;
          this.filterCard();
          document.getElementById('inputTextName').focus();
        }
      );
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
          document.getElementById('inputTextName').focus();
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
          document.getElementById('inputTextName').focus();
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
            this.newCard.name = null;
            this.newCard.number = null;
            this.cards = data;
            this.filterCard();
            document.getElementById('inputTextName').focus();
          }
      );

    }
  }

  changePage(pageConfig: PageConfig) {
    this.pages.forEach(page => {
      page.class = (pageConfig.pageNumber == page.pageNumber ? 'page-item active' : 'page-item');
    });
    this.currentPage = pageConfig.pageNumber;
    this.filterCard();
  }
  
}
