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
import { Card } from '../types/card';

interface CreateCardProps {
  userId: string;
  deckId: string;
  question: string;
  response: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  public async getDecks(userId: string): Promise<Deck[]> {
    const decksSnapshot = await getDocs(
      query(
        collection(this.firestore, `users/${userId}/decks`),
        orderBy('name')
      )
    );
    return decksSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        name: doc.data()['name'],
      };
    });
  }

  public async createDeck(userId: string, name: string): Promise<void> {
    await addDoc(collection(this.firestore, `users/${userId}/decks`), { name });
  }

  public async getCards(userId: string, deckId: string): Promise<Card[]> {
    const cardsSnapshot = await getDocs(
      query(collection(this.firestore, `users/${userId}/decks/${deckId}/cards`))
    );
    return cardsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        question: doc.data()['question'],
        response: doc.data()['response'],
      };
    });
  }

  public async createCard({
    userId,
    deckId,
    question,
    response,
  }: CreateCardProps): Promise<void> {
    await addDoc(
      collection(this.firestore, `users/${userId}/decks/${deckId}/cards`),
      { question, response }
    );
  }
}
