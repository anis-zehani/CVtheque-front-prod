import { Entreprise } from './entreprise';

export class Utilisateur {

    id: number;
    identite: string;
    telephone: string;
    email: string;
    posteOccupe: string;
    descriptionDetaillee: string;
    username: string;
    password: string;
    urlPhoto: string;
    entreprise: Entreprise; // @ManyToOne
}
