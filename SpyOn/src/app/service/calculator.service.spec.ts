import { LoggerService } from 'src/app/service/logger.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService:', ()=>{
  let mockLogService: any;
  let service: CalculatorService;

  beforeEach(()=>{
    //arrange
    mockLogService = jasmine.createSpyObj('LoggerService', ['log']);
    service = new CalculatorService(mockLogService);
  })

  it('should return 1+1=2', ()=>{
    //act
    let returnVar = service.add(1, 1);

    //assert
    expect(returnVar).toBe(2);
    expect(mockLogService.log).toHaveBeenCalledTimes(1);
  })

  it('should return 1-1=0', ()=>{
    //act
    let returnVar = service.subtract(1, 1);

    //assert
    expect(returnVar).toBe(0);
    expect(mockLogService.log).toHaveBeenCalledTimes(1);
  })
})
