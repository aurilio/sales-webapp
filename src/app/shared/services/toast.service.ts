import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000): void {
    const id = uuid();
    const toast: ToastMessage = { id, message, type };

    this.messagesSubject.next([...this.messagesSubject.value, toast]);

    setTimeout(() => this.remove(id), duration);
  }

  remove(id: string): void {
    const filtered = this.messagesSubject.value.filter(m => m.id !== id);
    this.messagesSubject.next(filtered);
  }
}
