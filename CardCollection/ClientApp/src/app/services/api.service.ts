import { Injectable, Inject } from '@angular/core';
import { Observable, Subscribable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Card, SubSet, Set } from '../app.interfaces';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  getCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(this.baseUrl + 'card/GetCards');
  }

  getSets(): Observable<Set[]> {
    return this.httpClient.get<Set[]>(this.baseUrl + 'card/GetSets');
  }

  getSubSets(setId: number): Observable<SubSet[]> {
    return this.httpClient.get<SubSet[]>(this.baseUrl + 'card/GetSubSets/' + setId);
  }

  addSet(set: Set): Observable<Set[]> {
    return this.httpClient.post<Set[]>(this.baseUrl + 'card/AddSet', set);
  }

  addSubSet(subSet: SubSet): Observable<SubSet[]> {
    return this.httpClient.post<SubSet[]>(this.baseUrl + 'card/AddSubSet', subSet);
  }

  incrementCard(card: Card): Observable<Card[]> {
    return this.httpClient.put<Card[]>(this.baseUrl + 'card/IncrementQuantity/' + card.cardId, {});
  }

  decrementCard(card: Card): Observable<Card[]> {
    return this.httpClient.put<Card[]>(this.baseUrl + 'card/DecrementQuantity/' + card.cardId, {});
  }

  addCard(card: Card): Observable<Card[]> {
    return this.httpClient.post<Card[]>(this.baseUrl + 'card/AddCard', card, {});
  }
}

