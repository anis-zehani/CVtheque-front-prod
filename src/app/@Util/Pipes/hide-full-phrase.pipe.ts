import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideFullPhrase'
})
export class HideFullPhrasePipe implements PipeTransform {

  transform(value: string): string {
    const indexSeparation = value.indexOf( ' ' );
    const debut = value.substring(0, indexSeparation);
    const stringFinal = debut + ' ✴ ✴ ✴ ✴ ✴';

    return stringFinal;
  }

}
