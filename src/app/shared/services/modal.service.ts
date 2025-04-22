import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ModalState {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalStateSubject = new BehaviorSubject<ModalState>({
    open: false,
    title: '',
    message: '',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar'
  });

  private confirmResultSubject = new Subject<boolean>();

  modalState$: Observable<ModalState> = this.modalStateSubject.asObservable();
  confirmResult$: Observable<boolean> = this.confirmResultSubject.asObservable();

  open(config: Partial<ModalState>): void {
    this.modalStateSubject.next({
      open: true,
      title: config.title || '',
      message: config.message || '',
      confirmText: config.confirmText || 'Confirmar',
      cancelText: config.cancelText || 'Cancelar'
    });
  }

  confirm(): void {
    this.confirmResultSubject.next(true);
    this.close();
  }

  cancel(): void {
    this.confirmResultSubject.next(false);
    this.close();
  }

  private close(): void {
    this.modalStateSubject.next({
      open: false,
      title: '',
      message: '',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar'
    });
  }
}