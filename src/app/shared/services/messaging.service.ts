import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(private primeNgMessageService: MessageService) {}

  showSuccess(message: string, title: string = 'Επιτυχία') {
    this.primeNgMessageService.add({
      severity: 'success',
      summary: title,
      detail: message,
    });
  }

  showInfo(message: string, title: string = 'Πληροφορία') {
    this.primeNgMessageService.add({
      severity: 'info',
      summary: title,
      detail: message,
    });
  }

  showWarn(message: string, title: string = 'Προειδοποίηση') {
    this.primeNgMessageService.add({
      severity: 'warn',
      summary: title,
      detail: message,
    });
  }

  showError(message: string, title: string = 'Σφάλμα') {
    this.primeNgMessageService.add({
      severity: 'error',
      summary: title,
      detail: message,
    });
  }
}
