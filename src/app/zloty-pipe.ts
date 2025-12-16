import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zlotyPipe'
})
export class ZlotyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value + " zł";
  }

}
