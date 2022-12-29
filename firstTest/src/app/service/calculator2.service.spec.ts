import { LoggerService } from './logger.service';
import { Calculator2Service } from 'src/app/service/calculator2.service';

describe('Calculator2Service: ', ()=>{
  it('should return 1+1=2', ()=>{
    //arrange
    let logService = new LoggerService();
    let service = new Calculator2Service(logService);
    let returnVar: number;

    //act
    returnVar = service.add(1, 1);

    //assert
    expect(returnVar).toBe(2);
  })

  it('should return 1-1=0', ()=>{
    //arrange
    let logService = new LoggerService();
    let service = new Calculator2Service(logService);
    let returnVar: number;

    //act
    returnVar = service.subtract(1, 1);

    //assert
    expect(returnVar).toBe(0);
  })
})
