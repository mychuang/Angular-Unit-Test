import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

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
