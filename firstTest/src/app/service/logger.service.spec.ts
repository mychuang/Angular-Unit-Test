import {LoggerService} from 'src/app/service/logger.service'

describe("LoggerService: ", ()=>{
  it('should get empty array', ()=>{
    //arrange
    let service = new LoggerService();

    //assert
    expect(service.messages.length).toBe(0);
  })

  it('should add one array', ()=>{
    //arrange
    let service = new LoggerService();
    let returnValue = 1;

    //act
    service.log('test');

    //assert
    expect(service.messages.length).toBe(1);
    expect(service.messages[0]).toBe('test');
  })
})
