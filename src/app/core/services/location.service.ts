
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { ILocation, ILocationReq } from '@app/interfaces';

export interface ILocationRequest {
  id: string;
  name: string;
  image: string;
  full_address: string;
  street_1: string;
  street_2: string;
  suite: string;
  city: string;
  state: string;
  province: string;
  country: string;
  postal_code: string;
  phone_number: string;
  phone_number_ext: string;
  country_code: string;
  fax_number: string;
  fax_number_ext: string;
  fax_country_code: string;
  email_address: string;
  primary_tax_rate: number;
  secondary_tax_rate: number;
}
export interface IImageResultRes { image: string; }
export interface IDeleteLocationReq { location_id: string; }
export interface IDeleteLocationRes { [key: string]: any; }

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  public getLocations(): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(`${API_URL}/locations`);
  }

  public createLocation(data: ILocationReq): Observable<ILocation> {
    return this.http.post<ILocation>(`${API_URL}/locations`, data);
  }

  public editLocation(data: ILocationReq): Observable<ILocation> {
    return this.http.put<ILocation>(`${API_URL}/locations`, data);
  }

  public deleteLocation({ location_id }: IDeleteLocationReq): Observable<IDeleteLocationRes> {
    return this.http.delete<IDeleteLocationRes>(`${API_URL}/locations/${location_id}`);
  }

  public uploadLocationImage({ data }: { data: FormData }): Observable<IImageResultRes> {
    return this.http.post<IImageResultRes>(`${API_URL}/locations/image`, data);
  }

}
