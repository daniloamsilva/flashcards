import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Deck } from '../types/deck';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  public async getDecks(): Promise<Deck[]> {
    const decksSnapshot = await getDocs(collection(this.firestore, 'decks'));
    return decksSnapshot.docs.map((doc) => {
      return {
        uuid: doc.id,
        name: doc.data()['name'],
      };
    });
  }
}
