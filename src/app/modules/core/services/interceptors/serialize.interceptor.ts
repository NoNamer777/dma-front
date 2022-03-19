import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { forwardRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IndexedByString {
    [key: string]: unknown;
}

export const SERIALIZE_INTERCEPTOR_PROVIDER = {
    provide: HTTP_INTERCEPTORS,
    useClass: forwardRef(() => SerializeInterceptor),
    multi: true,
};

@Injectable({ providedIn: 'root' })
export class SerializeInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<unknown>> {
        return handler.handle(request.clone({ body: this.serialize(request.body) }));
    }

    /**
     * Takes the body of a request and takes out all `_` from the attributes of objects if a class object is send
     * that had private attributes in them.
     * @param data the body of a request.
     * @private
     */
    private serialize(data: unknown): unknown {
        if (['string', 'number', 'boolean'].includes(typeof data) || data === null || data === undefined) {
            return data;
        } else if (data instanceof Array) {
            const arrayValue = [];

            for (const entry of data) {
                arrayValue.push(this.serialize(entry));
            }
            return arrayValue;
        } else {
            const objectValue = {} as IndexedByString;
            const keys = Object.keys(data);

            for (const key of keys) {
                const serializedKey = key.replace('_', '');

                objectValue[serializedKey] = this.serialize((data as IndexedByString)[key]);
            }

            return objectValue;
        }
    }
}
