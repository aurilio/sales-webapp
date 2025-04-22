import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-back-to-home-button',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  templateUrl: './back-to-home-button.component.html',
  styleUrls: ['./back-to-home-button.component.scss']
})
export class BackToHomeButtonComponent {}

