import { Entreprise } from '../@Models/entreprise';

export class Contact {
  
    id: number;
    identite: string;
    telephone:string;
    email:string;
    posteOccupe:string;
    descriptionDetaillee:string;
    urlPhoto:string;
    entreprise:Entreprise;
  }
  