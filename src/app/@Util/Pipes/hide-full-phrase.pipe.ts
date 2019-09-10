import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideFullPhrase'
})
export class HideFullPhrasePipe implements PipeTransform {

  // cache une partie de la phrase : remplace par des étoiles
  transform(value: string): string {
    const indexSeparation = value.indexOf( ' ' );
    const firstLetter = value.substring(0, 1);
    const debut = value.substring(1, indexSeparation);
    const stringFinal = firstLetter.toUpperCase() + debut + ' ✴ ✴ ✴ ✴ ✴';

    return stringFinal;
  }

}
