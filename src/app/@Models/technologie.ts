import { Opportunite } from './opportunite';

export class Technologie {
  
  id: number;
  nomTechnologie: string;
  descriptionDetaillee : string;
  selected: boolean;

  constructor(id: number, nomTechnologie: string, descriptionDetaillee: string) {
    this.id = id;
    this.nomTechnologie = nomTechnologie;
    this.descriptionDetaillee =  descriptionDetaillee;
  }
}

