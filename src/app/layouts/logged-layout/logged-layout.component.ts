import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-logged-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './logged-layout.component.html',
  styleUrl: './logged-layout.component.css',
})
export class LoggedLayoutComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
