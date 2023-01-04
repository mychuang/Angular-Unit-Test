import { Pipe, PipeTransform } from '@angular/core';

//管道的名字
@Pipe({
  name: 'score'
})
export class ScorePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value >= 60 && value < 80) {
      return "low";
    } else if (value >= 80) {
      return "high";
    } else {
      return "none";
    }
  }

}
