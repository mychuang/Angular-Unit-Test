import { LoggerService } from 'src/app/service/logger.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCATION } from 'src/app/model/location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private servie: LoggerService, private http: HttpClient) { }

  getLocation(): Observable<LOCATION[]>{
    this.servie.log('call logger');

    return this.http.get<LOCATION[]>('http://localhost:3000/Location');
  }
}
