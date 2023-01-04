import { ScorePipe } from './score.pipe';

describe('ScorePipe', () => {
  it('create an instance', () => {
    const pipe = new ScorePipe();
    expect(pipe).toBeTruthy();
  });

  it('should show "low"', ()=>{
    //arrange
    const pipe = new ScorePipe();

    //asert
    expect(pipe.transform(60)).toBe('low');
  })

  it('should show "high"', ()=>{
    //arrange
    const pipe = new ScorePipe();

    //asert
    expect(pipe.transform(80)).toBe('high');
  })

  it('should show "none"', ()=>{
    //arrange
    const pipe = new ScorePipe();

    //asert
    expect(pipe.transform(59)).toBe('none');
  })
});
