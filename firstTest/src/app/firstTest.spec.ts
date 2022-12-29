//describe: 一個測試的區塊(Suites), 允許巢狀的
describe('First Test', ()=>{

  //it: 一個測試的最小單位(Specs )
  it('should pass the test', ()=>{
    //arrange: 準備需要用的資料
    let test = true;

    //assert:  預期會發生的結果
    expect(test).toBe(true);
  })
})
