import { Injectable } from '@angular/core';

import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | undefined;

  public async setUser(user: User | undefined): Promise<void> {
    this.user = user;
  }

  public async getUser(): Promise<User | undefined> {
    return this.user;
  }
}
