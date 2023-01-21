import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', ()=>{
  let service: CalculatorService;
  let mockLogService: any;

  beforeEach(()=>{
    mockLogService = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers:[{
        provide: LoggerService,
        useValue: mockLogService
      }]
    });

    // Inject both the service-to-test and its (spy) dependency
    service = TestBed.inject(CalculatorService);
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
