import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCATION } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocation(){
    return this.http.get<LOCATION[]>('http://localhost:3000/Location');
  }
}
