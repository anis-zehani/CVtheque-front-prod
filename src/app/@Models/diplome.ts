import { TypeDiplome } from './enums';
import { Ecole } from './ecole';

export class Diplome {
    
    id: number;
    typeDiplome :  TypeDiplome;
    ecole: Ecole;
    dateObtentionDiplome : Date;
}
