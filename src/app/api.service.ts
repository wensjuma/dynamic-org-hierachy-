import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
const BACKEND_URL = environment.apiEndpoint;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public headers: HttpHeaders;
  public ecommerceRQSTOptions: any;

  constructor(private http: HttpClient) { }

  setEcommerceHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Ecommerce-version': '1.0.0'
    });
    this.ecommerceRQSTOptions = {
      headers: this.headers,
      responseType: 'json'
    };
  }

  /**
   * Get organizational array
  */
 getOrgaStructure(): Observable<any> {
  const apiURL = `${BACKEND_URL}` + 'assets/oranganization_structure.json';
  console.log('apiURL => ', apiURL);
  return this.http.get(apiURL)
  .pipe(map(response => {
    return response;
  }));
}

/**
   * Get employee array
  */
 getEmployee(): Observable<any> {
  const apiURL = `${BACKEND_URL}` + 'assets/employee.json';
  return this.http.get(apiURL)
  .pipe(map(response => {
    return response;
  }));
}

}
