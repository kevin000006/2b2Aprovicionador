import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../main/error/error.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    private readonly urlBase: string = "https://b2bback.azurewebsites.net/api";
    //private readonly urlBase: string = "http://localhost:8084/api";
    //private readonly urlBase: string = "http://localhost:8080/api";

    constructor(public errorDialogService: ErrorDialogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        if (request.body instanceof FormData) {
            //request = request.clone({ headers: request.headers.set('Content-Type', 'multipart/form-data') });            
        }
        else {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({ url: `${this.urlBase}${request.url}`, headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                //this.errorDialogService.openDialog(data);
                return throwError(error);
            }));
    }
}