import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-back-to-home-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './back-to-home-button.component.html',
  styleUrls: ['./back-to-home-button.component.scss']
})
export class BackToHomeButtonComponent {}

