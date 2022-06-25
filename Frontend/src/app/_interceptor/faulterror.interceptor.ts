import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class FaultErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          errorMsg = this.normalizeXML(error.error)
          return throwError(errorMsg);
        })
      )
  }
  
  normalizeXML(xmlstr:string){
   xmlstr = xmlstr.substring(xmlstr.lastIndexOf("---&gt")+7,xmlstr.lastIndexOf("</faultstring>"));
   return xmlstr;
  }

}