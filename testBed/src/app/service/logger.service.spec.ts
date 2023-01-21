import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service";

describe('LoggerService', ()=>{
  let service: LoggerService;

  beforeEach(()=>{
    //service = new LoggerService();

    //Angular TestBed 創建模擬的測試模組
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);

  })

  it('should get empty array at begining', ()=>{
    expect(service.messages.length).toBe(0);
  })

  it('should add message when log() is called',()=>{
    //act
    service.log('test');

    //assert
    expect(service.messages.length).toBe(1);
  })

  it('should clear all message when clear() is called', ()=>{
    //act
    service.log('test');
    service.clear();

    //assert
    expect(service.messages.length).toBe(0);
  })


})
