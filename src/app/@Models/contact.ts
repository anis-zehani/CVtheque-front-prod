import { Entreprise } from '../@Models/entreprise';
import { Utilisateur } from './utilisateur';

export class Contact {

    id: number;
    identite: string;
    telephone: string;
    email: string;
    posteOccupe: string;
    descriptionDetaillee: string;
    urlPhoto: string;
    entreprise: Entreprise;
    utilisateur: Utilisateur; // @ManyToOne
  }
