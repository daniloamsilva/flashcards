import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../types/user';
import { Deck } from '../../types/deck';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user: User | undefined;
  decks: Deck[] = [];
  newDeckName: string = '';

  constructor(
    private userService: UserService,
    private firestoreService: FirestoreService
  ) {}

  async ngOnInit() {
    this.user = await this.userService.getUser();
    this.decks = await this.getDecks();
  }

  private async getDecks(): Promise<Deck[]> {
    if (!this.user) {
      return [];
    }

    return await this.firestoreService.getDecks(this.user.id);
  }

  public async handleCreateDeck() {
    if (!this.user) {
      return;
    }

    await this.firestoreService.createDeck(this.user.id, this.newDeckName);
    this.decks = await this.getDecks();
    this.newDeckName = '';
  }
}
