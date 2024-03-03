import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../types/user';
import { Deck } from '../../types/deck';
import { FirestoreService } from '../../services/firestore.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
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
    return await this.firestoreService.getDecks();
  }

  public async handleCreateDeck() {
    await this.firestoreService.createDeck(this.newDeckName);
    this.decks = await this.getDecks();
    this.newDeckName = '';
  }
}
