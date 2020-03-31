export interface Card {
  cardId: number;
  name: string;
  number: string;
  set: string;
  subSet: string;
  quantity: number;
  year: number;
}

export interface Set {
  setId: number;
  setName: string;
}

export interface SubSet {
  subsetId: number;
  setId: number;
  subSetName: string;
}