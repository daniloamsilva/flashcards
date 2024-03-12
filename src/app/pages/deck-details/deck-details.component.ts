import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../types/user';
import { FirestoreService } from '../../services/firestore.service';
import { Card } from '../../types/card';

@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.css',
})
export class DeckDetailsComponent {
  id: string;
  user: User | undefined;
  cards: Card[] = [];

  question: string = '';
  response: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private firestoreService: FirestoreService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    this.cards = await this.getCards();
  }

  public async getCards(): Promise<Card[]> {
    if (!this.user) {
      return [];
    }

    return this.firestoreService.getCards(this.user.id, this.id);
  }

  public async handleCreateCard() {
    if (!this.user) {
      return;
    }

    await this.firestoreService.createCard({
      deckId: this.id,
      userId: this.user.id,
      question: this.question,
      response: this.response,
    });

    this.cards = await this.getCards();
    this.question = '';
    this.response = '';
  }
}
