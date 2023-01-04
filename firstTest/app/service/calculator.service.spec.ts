import {CalculatorService} from 'src/app/service/calculator.service';

describe('待定規則', ()=>{
  it('等待完成測試語句...')

  xit('使用xit待定', ()=>{
    throw 'This test will not run.';
  });

  it('pending...', ()=>{
    pending();
  })
})

describe('CalculatorService: ', ()=>{
  it('should return 1+1=2', ()=>{
    //arrange
    let service = new CalculatorService();
    let returnVar: number;

    //act
    returnVar = service.add(1, 1);

    //assert
    expect(returnVar).toBe(2);
  })

  it('should return 1-1=0', ()=>{
    //arrange
    let service = new CalculatorService();
    let returnVar: number;

    //act
    returnVar = service.subtract(1, 1);

    //assert
    expect(returnVar).toBe(0);
  })
})
