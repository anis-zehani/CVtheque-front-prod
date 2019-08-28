import { Entreprise } from '../@Models/entreprise';
import { Etat } from '../@Models/enums';

export class Partenaire {
    id: number;
    identite: string;
    telephone: string;
    email: string;
    posteOccupe: string;
    descriptionDetaillee: string;
    urlPhoto: string;
    username: string;
    password: string;
    entreprise: Entreprise;
    etatPartenaire: Etat; // Enum : True/False pour Actif/Inactif
    // listeCvSauvegardes : <list> Curriculum;
  }
