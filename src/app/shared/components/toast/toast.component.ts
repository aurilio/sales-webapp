import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toasts$: Observable<ToastMessage[]> = this.toastService.messages$;

  removeToast(id: string): void {
    this.toastService.remove(id);
  }
}
