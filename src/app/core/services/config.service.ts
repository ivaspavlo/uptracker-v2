
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { ICurrency, IRole } from '@app/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  public getRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(`${API_URL}/roles`);
  }

  public getCurrencies(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(`${API_URL}/config/currency`);
  }

}
