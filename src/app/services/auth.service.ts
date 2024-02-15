import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.warn(
          'Error signing in with Google: ',
          error.code,
          error.message,
          error.customData.email,
          error.credential,
          error.stack,
          error.customData
        );
      });
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/']);
  }
}