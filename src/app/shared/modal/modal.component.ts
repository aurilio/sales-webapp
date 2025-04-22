import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ModalService, ModalState } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  private modalService = inject(ModalService);
  modalState$: Observable<ModalState> = this.modalService.modalState$;

  confirm(): void {
    this.modalService.confirm();
  }

  cancel(): void {
    this.modalService.cancel();
  }
}
