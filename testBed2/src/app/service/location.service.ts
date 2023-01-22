import { Injectable } from '@angular/core';
import { LOCATION } from '../model/location';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private url!: string;

  constructor(private http: HttpClient) {
    //Declaire json-server API
    this.url = 'http://localhost:3000/';
  }

  //get all LOCATION data
  getLocation(): Observable<LOCATION[]>{
    const acionUrl = 'Location'
    const url = this.url + acionUrl;
    return this.http.get<LOCATION[]>(url);
  }

  //get one LOCATION data
  getSingle(id: number): Observable<LOCATION>{
    const acionUrl = 'Location/' + id;
    const url = this.url + acionUrl;
    return this.http.get<LOCATION>(url);
  }

  //insert one LOCATION data
  postLocation(location: LOCATION): Observable<LOCATION> {
    const acionUrl = 'Location'
    const url = this.url + acionUrl;
    return this.http.post<LOCATION>(url, location);
  }

  //update one LOCATION data
  putLocation(id: number): Observable<LOCATION> {
    const acionUrl = 'Location/' + id
    const url = this.url + acionUrl;
    return this.http.put<LOCATION>(url, location);
  }

  //delete one LOCATION data
  deleteLocation(id: number): Observable<LOCATION> {
    const acionUrl = 'Location/' + id
    const url = this.url + acionUrl;
    return this.http.delete<LOCATION>(url);
  }

}
