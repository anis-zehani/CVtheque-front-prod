import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideFullWord'
})
export class HideFullWordPipe implements PipeTransform {

  // cache tout le mot : remplace par des étoiles
  transform(value: string): string {

    const stringFinal = ' ✴ ✴ ✴ ✴ ✴';

    return stringFinal;
  }

}
