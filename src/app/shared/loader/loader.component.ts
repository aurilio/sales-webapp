import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../shared/services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  loaderService = inject(LoaderService);
  isLoading$: Observable<boolean> = this.loaderService.loaderState$;
}
