import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

interface Options {
  headers?:
    | HttpHeaders
    | {
    [header: string]: string | string[];
  };
  observe: 'events';
  params?:
    | HttpParams
    | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient) {
  }

  post<T>(
    url: string,
    body,
    options?: Partial<Options>
  ): Observable<T> {
    return this.http.post<T>(url, body, {...options, observe: 'body'});
  }

  put<T>(
    url: string,
    body,
    options?: Partial<Options>
  ): Observable<T> {
    return this.http.put<T>(url, body, {...options, observe: 'body'});
  }

  delete<T>(url: string, options?: Partial<Options>): Observable<T>{
    return this.http.delete<T>(url, {...options, observe: 'body'});
  }

  get<T>(url: string, options?: Partial<Options>): Observable<T> {
    return this.http.get<T>(url, {...options, observe: 'body'});
  }

  getParams(params: object): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        return httpParams = httpParams.set(null, null);
      }
      return (httpParams = httpParams.set(key, `${params[key]}`));
    });
    return httpParams;
  }
}
