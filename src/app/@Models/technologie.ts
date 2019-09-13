import { Opportunite } from './opportunite';
import { Utilisateur } from './utilisateur';

export class Technologie {
  id: number;
  nomTechnologie: string;
  descriptionDetaillee: string;
  selected: boolean;
  statNombreCandidatsLies: number;
  statNombreOpportunitesLiees: number;

  utilisateur: Utilisateur; // @ManyToOne

  constructor(id: number, nomTechnologie: string, descriptionDetaillee: string) {
    this.id = id;
    this.nomTechnologie = nomTechnologie;
    this.descriptionDetaillee =  descriptionDetaillee;
  }
}

