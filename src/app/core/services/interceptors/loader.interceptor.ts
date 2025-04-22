import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../../../shared/services/loader.service';

@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
