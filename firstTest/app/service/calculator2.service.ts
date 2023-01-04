import { LoggerService } from './logger.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Calculator2Service {

  constructor(private service: LoggerService) { }

  add(n1: number, n2: number): number{
    this.service.log('add');
    return n1+n2;
  }

  subtract(n1: number, n2: number): number{
    this.service.log('subtract');
    return n1-n2;
  }
}
