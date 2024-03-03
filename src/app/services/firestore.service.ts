import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from '@angular/fire/firestore';

import { Deck } from '../types/deck';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  public async getDecks(): Promise<Deck[]> {
    const decksSnapshot = await getDocs(
      query(collection(this.firestore, 'decks'), orderBy('name'))
    );
    return decksSnapshot.docs.map((doc) => {
      return {
        uuid: doc.id,
        name: doc.data()['name'],
      };
    });
  }

  public async createDeck(name: string): Promise<void> {
    await addDoc(collection(this.firestore, 'decks'), { name });
  }
}
